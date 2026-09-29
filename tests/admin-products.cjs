// node tests/admin-products.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, dependencies) {
    const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } });
    const exports = {};
    vm.runInNewContext(outputText, { exports, require: (name) => {
        assert(name in dependencies, `Unexpected dependency: ${name}`);
        return dependencies[name];
    } });
    return exports;
}

(async () => {
    let config;
    load('services/ProductService.ts', {
        '@reduxjs/toolkit/query/react': {
            fetchBaseQuery: (options) => options,
            createApi: (options) => { config = options; return options; },
        },
        '../constants/urls': { urls: { baseUrl: '/api/' } },
    });
    const endpoints = config.endpoints({ query: (options) => options, mutation: (options) => options });
    const params = { page: 2, page_size: 25, search: 'рыба', category: 9, sort_by: 'regular_price', sort_order: 'desc' };
    const request = endpoints.getAdminProducts.query(params);
    assert.equal(request.url, 'admin/products/');
    assert.equal(request.params, params);
    const headers = new Map();
    config.baseQuery.prepareHeaders(headers, { getState: () => ({ user: { authToken: 'test-token' } }) });
    assert.equal(headers.get('Authorization'), 'Token test-token');

    const calls = [];
    let fail = false;
    const { AdminProductsApi } = load('api/admin/products/AdminProductsApi.ts', {
        '../../EvotorApi': { EvotorApi: {
            getAllStores: async (token) => { assert.equal(token, 'test-token'); return [{ uuid: 'one' }, { uuid: 'two' }]; },
            getProductsByStoreId: async (storeId, token) => {
                calls.push([storeId, token]);
                if (fail) throw new Error('upstream unavailable');
                return [{ uuid: `product-${storeId}` }];
            },
        } },
    });
    const data = await AdminProductsApi.getEvotorData('test-token');
    assert.deepEqual(calls, [['one', 'test-token'], ['two', 'test-token']]);
    assert.equal(data.productsByStoreId.one[0].uuid, 'product-one');
    assert.equal(data.productsByStoreId.two[0].uuid, 'product-two');
    fail = true;
    await assert.rejects(AdminProductsApi.getEvotorData('test-token'), /upstream unavailable/);
    console.log('Admin product query, staff auth and isolated Evotor loader: passed');
})().catch((error) => { console.error(error); process.exitCode = 1; });

// A failed/reset Evotor load indexes null as {}; availability must use the nullable source.
const evotorModule = load('slices/Evotor/evotor.ts', { '@reduxjs/toolkit': require('@reduxjs/toolkit') });
let evotorState = evotorModule.default(undefined, evotorModule.storeProductsByStoreId(null));
const { default: ExternalIds } = load(
    'components/pages/admin/AdminProductsPage/components/TableBody/components/ExternalIds/ExternalIds.tsx', {
        'react/jsx-runtime': require('react/jsx-runtime'),
        react: { useMemo: (calculate) => calculate() },
        'react-redux': { useSelector: () => evotorState },
        '../../../../../../../../constants/admin': { EVOTOR_EXTERNAL_ID_DATA_SOURCE: 'evotor' },
        '../../../../../../../../slices/Evotor/evotor': { evotorReducerValues: () => {} },
    },
);
const product = { external_ids: [{ data_source: 'evotor', external_id: 'one/product-one' }] };
assert.equal(ExternalIds({ product }).props.children, 'Данные Эвотор не загружены');
evotorState = evotorModule.default(evotorState, evotorModule.storeProductsByStoreId({}));
assert.equal(ExternalIds({ product }).props.children, 'Нет связи с Evotor');
evotorState = evotorModule.default(evotorState, evotorModule.storeProductsByStoreId({ one: [{ uuid: 'product-one' }] }));
assert.equal(ExternalIds({ product }).props.children, 'Есть связь с Evotor');
console.log('Evotor unavailable, loaded empty and loaded linked states: passed');
