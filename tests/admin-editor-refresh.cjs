// node tests/admin-editor-refresh.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname,
    '../components/pages/admin/EditProductPage/EditProductPage.tsx'), 'utf8');
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});
const product = { id: 47, title: 'Saved title' };
let selectedProduct = product;
let query = { currentData: product, isFetching: false, isError: false };
const dependencies = {
    react: { useEffect: () => {}, useState: (value) => [value, () => {}] },
    'react/jsx-runtime': require('react/jsx-runtime'),
    'react-redux': {
        useDispatch: () => () => {},
        useSelector: (selector) => selector(),
    },
    'next/router': { useRouter: () => ({ query: { id: '47' }, isReady: true }) },
    '@mui/material': Object.fromEntries(['Alert', 'Button', 'CircularProgress', 'Grid'].map((name) => [name, name])),
    '../../../../slices/Product/product': { productReducerValues: () => ({ selectedProduct }) },
    '../../../../slices/User/user': { userReducerValues: () => ({ authToken: 'test-token' }) },
    '../../../../slices/Evotor/evotor': {},
    '../../../../services/ProductService': { productApi: { useGetProductByIdQuery: () => query } },
    '../../../../hooks/useAdminCategories': { default: () => ({ loading: false, error: false }) },
    '../../../../api/admin/products/AdminProductsApi': {},
    '../AdminProductsPage/components/ProductInfoSection/ProductInfoSection': { default: 'ProductInfo' },
    '../AdminProductsPage/components/ProductImagesSection/ProductImagesSection': { default: 'ProductImages' },
    '../AdminProductsPage/components/ProductExternalIdsSection/ProductExternalIdsSection': { default: 'ProductLinks' },
};
const exportsObject = {};
vm.runInNewContext(outputText, { exports: exportsObject, require: (name) => {
    assert(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
} });
const render = exportsObject.default;
function findElement(element, type) {
    if (!element || typeof element !== 'object') return undefined;
    if (element.type === type) return element;
    return [element.props?.children].flat().map((child) => findElement(child, type)).find(Boolean);
}

for (const status of [
    { isFetching: false, isError: false },
    { isFetching: true, isError: false },
    { isFetching: false, isError: true },
]) {
    query = { ...query, ...status };
    const tree = render();
    assert.equal(tree.type, 'Grid', 'Background refresh must not replace the editor with a spinner/error');
    for (const section of ['ProductInfo', 'ProductImages', 'ProductLinks']) {
        assert.equal(findElement(tree, section)?.props.product, product, `${section} must remain mounted`);
    }
    if (status.isError) assert.equal(findElement(tree, 'Alert')?.props.severity, 'warning');
}
selectedProduct = null;
query = { currentData: undefined, isFetching: true, isError: false };
assert.equal(render().type, 'CircularProgress', 'Initial loading still needs a spinner');
query = { ...query, isFetching: false, isError: true };
assert.equal(render().type, 'Alert', 'Initial failure must be visible');
selectedProduct = { id: 99 };
assert.equal(render().type, 'Alert', 'A different product must not mask an initial failure');
console.log('Actual editor render: background refresh/error preserve sections; initial loading/error stay visible');
