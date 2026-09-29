// node tests/admin-image-mutation.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync(path.join(__dirname,
    '../components/pages/admin/AdminProductsPage/components/ProductImagesSection/components/ImageModal/ImageModal.tsx'), 'utf8');
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});

function harness({ failWrite = false, failRefresh = false, image = null } = {}) {
    const calls = { writes: [], refreshes: 0, closes: 0 };
    const states = [], effectDependencies = [];
    let stateIndex, effectIndex, effects, form, tree;
    const mutation = (operation) => () => [(payload) => ({ unwrap: async () => {
        calls.writes.push({ operation, payload });
        if (failWrite) throw new Error('Write rejected');
        return { id: 81 };
    } }), { isLoading: false }];
    const named = (names) => Object.fromEntries(names.split(' ').map((name) => [name, name]));
    const dependencies = {
        react: {
            useId: () => 'image-test',
            useState: (initial) => {
                const index = stateIndex++;
                if (!(index in states)) states[index] = initial;
                return [states[index], (next) => {
                    states[index] = typeof next === 'function' ? next(states[index]) : next;
                }];
            },
            useEffect: (effect, deps) => {
                const index = effectIndex++;
                if (!effectDependencies[index] || deps.some((value, i) => !Object.is(value, effectDependencies[index][i]))) {
                    effects.push(effect);
                    effectDependencies[index] = deps;
                }
            },
        },
        'react/jsx-runtime': require('react/jsx-runtime'),
        yup: require('yup'),
        lodash: { isUndefined: (value) => value === undefined },
        formik: { useFormik: (options) => {
            form = options;
            return { values: options.initialValues, touched: {}, errors: {}, resetForm() {}, setFieldValue() {} };
        } },
        '@mui/material': named('FormControlLabel Grid IconButton Modal TextField Button CircularProgress Alert'),
        './styles': named('CloseIconWrapper ContentWrapper HiddenInput ImageWrapper ImageFormFields StyledCheckbox Wrapper'),
        '../../../../../../../../constants/theme': { theme: { colors: { primary: '#000' } } },
        '../../../../../../../../services/ProductService': { productApi: {
            useCreateProductImageMutation: mutation('create'),
            useUpdateProductImageMutation: mutation('update'),
            useDeleteProductImageMutation: mutation('delete'),
        } },
        '../../../../../../../../services/RemoveImageBGService': {
            removeImageBgApi: { useRemoveBgMutation: () => [() => {}, { reset() {} }] },
        },
        '../../constants/constants': named('CREATE_PRODUCT_IMAGE_QUERY_KEY DELETE_PRODUCT_IMAGE_QUERY_KEY UPDATE_PRODUCT_IMAGE_QUERY_KEY'),
        '../../../../../../../../constants/constants': { DS: '-' },
        './hooks/useHandleResults': { default: (productId) => async () => {
            assert.equal(productId, 47);
            calls.refreshes++;
            if (failRefresh) throw new Error('Refresh failed');
        } },
    };
    const exportsObject = {};
    vm.runInNewContext(outputText, { exports: exportsObject, require: (name) => {
        if (name.startsWith('@mui/icons-material/') || name === 'next/image' || name.endsWith('/PageTitle') || name.endsWith('/DeleteConfirmModal')) {
            return { default: 'span' };
        }
        assert(name in dependencies, `Unexpected dependency: ${name}`);
        return dependencies[name];
    } });
    const render = () => {
        stateIndex = effectIndex = 0;
        effects = [];
        tree = exportsObject.default({
            modalState: { open: true, image, productId: 47 },
            toggleEditImageOpen: () => { calls.closes++; },
        });
        effects.forEach((effect) => effect());
    };
    render();
    return {
        calls,
        render,
        submit: (values) => form.onSubmit(values),
        recoverRefresh: () => { failRefresh = false; },
        hasError: () => {
            const walk = (node) => Array.isArray(node) ? node.some(walk) : Boolean(node && typeof node === 'object' &&
                (node.type === 'Alert' && node.props.severity === 'error' || walk(node.props?.children)));
            return walk(tree);
        },
    };
}

(async () => {
    const values = Object.freeze({ alt_text: 'Fish', is_feature: false, image: { name: 'fish.png' } });
    const rejected = harness({ failWrite: true });
    await rejected.submit(values);
    rejected.render();
    assert.equal(rejected.calls.closes, 0, 'Rejected write must keep the dialog open');
    assert.equal(rejected.calls.refreshes, 0, 'Rejected write must not refresh stale data');
    assert.equal(rejected.hasError(), true, 'Rejected write must display an error');

    for (const image of [null, { id: 81, image: '/fish.png', alt_text: 'Old', is_feature: false }]) {
        const success = harness({ image });
        await success.submit(values);
        assert.equal(success.calls.writes.length, 1);
        assert.equal(success.calls.writes[0].operation, image ? 'update' : 'create');
        assert.equal(success.calls.refreshes, 1);
        assert.equal(success.calls.closes, 1, 'Successful write and refresh must close the dialog');
    }

    const retry = harness({ failRefresh: true });
    await retry.submit(values);
    retry.render();
    assert.equal(retry.calls.closes, 0);
    assert.equal(retry.hasError(), true, 'Failed refresh must display an error');
    retry.recoverRefresh();
    await retry.submit(values);
    assert.equal(retry.calls.writes.length, 1, 'Retry after saved write must not POST a duplicate image');
    assert.equal(retry.calls.refreshes, 2, 'Retry must reload only the selected product');
    assert.equal(retry.calls.closes, 1);

    const empty = harness();
    await empty.submit({ alt_text: '', is_feature: false });
    assert.equal(empty.calls.writes.length, 0, 'Missing image must not dispatch a create');
    console.log('Image mutations: rejected write, create/update success, refresh-only retry and missing file passed');
})().catch((error) => { console.error(error); process.exitCode = 1; });
