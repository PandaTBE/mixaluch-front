import { FC, useEffect, useId, useState } from 'react';
import { IProps } from '../ProductExternalIdsSection/interfaces';
import { useSelector } from 'react-redux';
import { categoryReducerValues } from '../../../../../../slices/Category/category';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
    Alert,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
} from '@mui/material';
import { IProductDTO } from '../../../../../../models/Product';
import { slugify, transliterate } from '../../../../../../tools/commonTools';
import { StyledCheckbox, StyledForm, Title } from './styles';
import { PRODUCT_UNIT_OPTIONS } from '../../../../../../constants/admin';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';
import { productApi } from '../../../../../../services/ProductService';
import { CREATE_PRODUCT_QUERY_QEY, DELETE_PRODUCT_QUERY_QEY, UPDATE_PRODUCT_QUERY_QEY } from './constants/constants';
import useHandleResults from './hooks/useHandleResults';
import { DS } from '../../../../../../constants/constants';
import ErrorMessage from '../../../../../ErrorMessage/ErrorMessage';

/**
 * Секция с информацией о товаре
 */
const ProductInfoSection: FC<IProps> = ({ product }) => {
    const requestsId = useId();
    const { categories } = useSelector(categoryReducerValues);
    const [updateProduct, updateProductResult] = productApi.useUpdateProductMutation({
        fixedCacheKey: `${UPDATE_PRODUCT_QUERY_QEY}${DS}${requestsId}`,
    });
    const [createProduct, createProductResult] = productApi.useCreateProductMutation({
        fixedCacheKey: `${CREATE_PRODUCT_QUERY_QEY}${DS}${requestsId}`,
    });
    const [deleteProduct, deleteProductResult] = productApi.useDeleteProductMutation({
        fixedCacheKey: `${DELETE_PRODUCT_QUERY_QEY}${DS}${requestsId}`,
    });
    useHandleResults(requestsId);

    const [isDeleConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [isCancel, setIsCancel] = useState({});

    const initialValues: Omit<IProductDTO, 'category'> & { category: string | number } = {
        regular_price: 0,
        is_negotiable_price: false,
        discount_price: 0,
        min_quantity: 0.3,
        description: '',
        category: '',
        is_popular: false,
        slug: '',
        title: '',
        unit: 'KG',
    };

    const validationSchema = yup.object({
        title: yup.string().required('Это обязательное поле').max(255, 'Максимальное число символов - 255'),
        category: yup.number().typeError('Выберите категорию').integer().positive().required('Это обязательное поле'),
        regular_price: yup.number().integer('Цена должна быть целым числом').min(0).required('Это обязательное поле'),
        min_quantity: yup.number().moreThan(0, 'Укажите количество больше нуля').required('Это обязательное поле'),
    });

    const onSubmit = (formValues: Omit<IProductDTO, 'category'> & { category: string | number }) => {
        const category = Number(formValues.category);
        if (Number.isSafeInteger(category) && category > 0) {
            const slug = slugify(transliterate(formValues.title));
            const result = { ...formValues, category, slug };
            if (product) {
                updateProduct({ data: result as IProductDTO, id: product.id });
            } else {
                createProduct({ ...result, discount_price: result.regular_price } as IProductDTO);
            }
        }
    };

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
    });

    useEffect(() => {
        if (product) {
            formik.setValues({
                regular_price: product.regular_price,
                is_negotiable_price: product.is_negotiable_price ?? false,
                discount_price: product.discount_price,
                min_quantity: product.min_quantity,
                description: product.description,
                is_popular: product.is_popular,
                category: product.category,
                title: product.title,
                unit: product.unit,
                slug: product.slug,
            });
        }
    }, [product?.id, product?.regular_price, product?.is_negotiable_price, product?.discount_price,
        product?.min_quantity, product?.description, product?.is_popular, product?.category,
        product?.title, product?.unit, product?.slug, isCancel]);

    const toggleDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen((prevState) => !prevState);
    };

    const onDeleteConfirm = () => {
        if (product) {
            deleteProduct(product.id);
        }
    };

    const onCancel = () => {
        setIsCancel({});
        formik.resetForm();
    };

    const isLoading = updateProductResult.isLoading || createProductResult.isLoading || deleteProductResult.isLoading;

    return (
        <div>
            <Stack gap={1} direction="column">
                {updateProductResult.isSuccess && <Alert severity="success">Изменения сохранены.</Alert>}
                {createProductResult.isError && (
                    <ErrorMessage text={'При создании товара возникла ошибка, попробуйте позже'} />
                )}
                {updateProductResult.isError && (
                    <ErrorMessage text={'При обновлении товара возникла ошибка, попробуйте позже'} />
                )}
                {deleteProductResult.isError && (
                    <ErrorMessage text={'При удалении товара возникла ошибка, попробуйте позже'} />
                )}
            </Stack>
            <Title>Информация с сайта</Title>
            <Modal onClose={toggleDeleteConfirmModal} open={isDeleConfirmModalOpen}>
                <DeleteConfirmModal
                    bodyText={'Вы уверены, что хотите удалить товар?'}
                    titleText={'Удаление товара'}
                    deleteConfirm={onDeleteConfirm}
                    toggleOpen={toggleDeleteConfirmModal}
                />
            </Modal>
            <StyledForm onSubmit={formik.handleSubmit}>
                <Stack gap={2}>
                    <TextField
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        disabled={isLoading}
                        fullWidth={true}
                        label="Название"
                        name={'title'}
                    />
                    <TextField
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        name={'description'}
                        disabled={isLoading}
                        label="Описание (необязательно)"
                        fullWidth={true}
                        multiline
                    />
                    <FormControl fullWidth>
                        <InputLabel id={`${requestsId}-category`}>Категория</InputLabel>
                        <Select
                            disabled={isLoading}
                            labelId={`${requestsId}-category`}
                            value={formik.values.category}
                            label="Категория"
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            onChange={formik.handleChange}
                            name="category"
                        >
                            {(categories || []).map((category) => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id={`${requestsId}-unit`}>Ед. измерения</InputLabel>
                        <Select
                            disabled={isLoading}
                            labelId={`${requestsId}-unit`}
                            value={formik.values.unit}
                            label="Ед. измерения"
                            error={formik.touched.unit && Boolean(formik.errors.unit)}
                            onChange={formik.handleChange}
                            name="unit"
                        >
                            {PRODUCT_UNIT_OPTIONS.map((unit) => (
                                <MenuItem key={unit.id} value={unit.id}>
                                    {unit.text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={
                            <StyledCheckbox
                                disabled={isLoading}
                                onChange={(event) => {
                                    formik.handleChange(event);
                                    if (event.target.checked) {
                                        formik.setFieldValue('regular_price', Number(formik.values.regular_price) || 0);
                                    }
                                }}
                                checked={formik.values.is_negotiable_price}
                                name="is_negotiable_price"
                            />
                        }
                        label="Договорная цена"
                    />
                    <TextField
                        disabled={isLoading || formik.values.is_negotiable_price}
                        error={formik.touched.regular_price && Boolean(formik.errors.regular_price)}
                        helperText={formik.touched.regular_price && formik.errors.regular_price}
                        value={formik.values.regular_price}
                        onChange={formik.handleChange}
                        name={'regular_price'}
                        label="Цена"
                        fullWidth={true}
                        type="number"
                    />
                    <TextField
                        disabled={isLoading}
                        error={formik.touched.min_quantity && Boolean(formik.errors.min_quantity)}
                        helperText={formik.touched.min_quantity && formik.errors.min_quantity}
                        value={formik.values.min_quantity}
                        onChange={formik.handleChange}
                        name={'min_quantity'}
                        label="Мин. кол-во для заказа"
                        fullWidth={true}
                        type="number"
                        inputProps={{
                            step: '0.1',
                            min: '0',
                        }}
                    />
                    <FormControlLabel
                        control={
                            <StyledCheckbox
                                disabled={isLoading}
                                inputProps={{ 'aria-label': 'controlled' }}
                                onChange={formik.handleChange}
                                checked={formik.values.is_popular}
                                name={'is_popular'}
                            />
                        }
                        label="Отображать на главной странице?"
                    />
                    <Stack flexWrap="wrap" direction="row" alignItems="center" gap={1}>
                        <Button
                            disabled={isLoading}
                            type="submit"
                            variant={'contained'}
                            color={product ? 'success' : 'primary'}
                        >
                            {product ? 'Сохранить изменения' : 'Создать'}
                        </Button>
                        <Button disabled={isLoading} onClick={onCancel} variant={'contained'} color="warning">
                            Отменить изменения
                        </Button>
                        {Boolean(product) && (
                            <Button
                                disabled={isLoading}
                                onClick={toggleDeleteConfirmModal}
                                variant={'contained'}
                                color="error"
                            >
                                Удалить товар
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </StyledForm>
        </div>
    );
};

export default ProductInfoSection;
