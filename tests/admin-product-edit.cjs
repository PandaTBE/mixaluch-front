// node tests/admin-product-edit.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname,
    '../components/pages/admin/AdminProductsPage/components/ProductInfoSection/ProductInfoSection.tsx'), 'utf8');
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
});
let form;
const updates = [];
const creates = [];
const populatedValues = [];
const states = [];
let stateIndex = 0;
let effectDependencies;
const dependencies = {
    react: {
        useId: () => 'test-form',
        useEffect: (effect, deps) => {
            if (!effectDependencies || deps.some((value, index) => !Object.is(value, effectDependencies[index]))) effect();
            effectDependencies = deps;
        },
        useState: (value) => {
            const index = stateIndex++;
            if (!(index in states)) states[index] = value;
            return [states[index], (next) => { states[index] = next; }];
        },
    },
    'react/jsx-runtime': require('react/jsx-runtime'),
    'react-redux': { useSelector: () => ({ categories: [{ id: 12, name: 'Рыба' }] }) },
    '../../../../../../slices/Category/category': { categoryReducerValues: () => {} },
    yup: require('yup'),
    formik: { useFormik: (options) => {
        form = options;
        return { values: options.initialValues, touched: {}, errors: {}, setValues: (values) => populatedValues.push(values) };
    } },
    '@mui/material': Object.fromEntries([
        'Button', 'FormControl', 'FormControlLabel', 'InputLabel', 'MenuItem', 'Modal', 'Select', 'Stack', 'TextField',
    ].map((name) => [name, name])),
    '../../../../../../tools/commonTools': { transliterate: (title) => title, slugify: (title) => title.toLowerCase() },
    './styles': { StyledCheckbox: 'input', StyledForm: 'form', Title: 'h2' },
    '../../../../../../constants/admin': { PRODUCT_UNIT_OPTIONS: [] },
    '../DeleteConfirmModal/DeleteConfirmModal': { default: 'dialog' },
    '../../../../../../services/ProductService': { productApi: {
        useUpdateProductMutation: () => [(payload) => updates.push(payload), {}],
        useCreateProductMutation: () => [(payload) => creates.push(payload), {}],
        useDeleteProductMutation: () => [() => {}, {}],
    } },
    './constants/constants': { CREATE_PRODUCT_QUERY_QEY: 'create', UPDATE_PRODUCT_QUERY_QEY: 'update', DELETE_PRODUCT_QUERY_QEY: 'delete' },
    './hooks/useHandleResults': { default: () => {} },
    '../../../../../../constants/constants': { DS: '-' },
    '../../../../../ErrorMessage/ErrorMessage': { default: 'span' },
};
const exportsObject = {};
vm.runInNewContext(outputText, { exports: exportsObject, require: (name) => {
    assert(name in dependencies, `Unexpected dependency: ${name}`);
    return dependencies[name];
} });
const Component = exportsObject.default;
const render = (product) => { stateIndex = 0; Component({ product }); };
render({ id: 47 });
const edit = form;
const values = Object.freeze({ ...edit.initialValues, title: 'Fish', category: '12', regular_price: 800, discount_price: 700 });
assert.equal(edit.validationSchema.validateSync(values).category, 12);
edit.onSubmit(values);
assert.equal(updates.length, 1, 'String category from the form must save rather than silently do nothing');
assert.equal(updates[0].id, 47, 'Update must target the selected product');
assert.equal(updates[0].data.category, 12);
assert.equal(updates[0].data.discount_price, 700, 'Editing must preserve the existing discount price');
assert.equal(updates[0].data.slug, 'fish');
assert.equal(creates.length, 0);
assert.equal(values.category, '12', 'Submission must not mutate form values');
for (const category of ['', 'invalid', '0', '-1', '1.5']) {
    edit.onSubmit({ ...values, category });
}
assert.equal(updates.length, 1, 'Invalid category must never dispatch an update');
assert.throws(() => edit.validationSchema.validateSync({ ...values, category: '' }));

render(null);
form.onSubmit(values);
assert.equal(creates.length, 1);
assert.equal(creates[0].category, 12);
assert.equal(creates[0].discount_price, 800, 'New products initialize discount_price from regular_price');
form.onSubmit({ ...values, category: '' });
assert.equal(creates.length, 1, 'Empty category must never dispatch a create');
assert.equal(updates.length, 1);
console.log('Actual product form submit: string category, selected ID, create price and invalid categories passed');

const product = { ...values, id: 47, category: 12, images: [], external_ids: [] };
render(product);
const beforeRefresh = populatedValues.length;
render({ ...product, images: [{ id: 1 }] });
render({ ...product, external_ids: [{ id: 2 }] });
assert.equal(populatedValues.length, beforeRefresh, 'Image/link refresh must not reset unsaved editable form fields');
render({ ...product, title: 'Changed on server' });
assert.equal(populatedValues.length, beforeRefresh + 1, 'Changed editable fields must refresh the form');
render({ ...product, id: 48 });
assert.equal(populatedValues.length, beforeRefresh + 2, 'Switching product must refresh the form');
console.log('Image/link-only refresh preserves unsaved form values; editable fields and product switch refresh them');
