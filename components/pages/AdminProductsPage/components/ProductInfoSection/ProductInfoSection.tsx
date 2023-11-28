import { FC, useEffect, useMemo, useState } from 'react';
import { IProps } from '../ProductExternalIdsSection/interfaces';
import { useSelector } from 'react-redux';
import { categoryReducerValues } from '../../../../../slices/Category/category';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { ICategory } from '../../../../../models/Category';
import {
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListSubheader,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
} from '@mui/material';
import { IProductInfoDTO } from '../../../../../models/Product';
import { slugify, transliterate } from '../../../../../tools/commonTools';
import { StyledCheckbox, StyledForm, Title } from './styles';
import { PRODUCT_UNIT_OPTIONS } from '../../../../../constants/admin';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal';

/**
 * Секция с информацией о товаре
 */
const ProductInfoSection: FC<IProps> = ({ product }) => {
    const { categories } = useSelector(categoryReducerValues);
    const [isDeleConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
    const [isCancel, setIsCancel] = useState({});

    const initialValues: Omit<IProductInfoDTO, 'category'> & { category: string | number } = {
        regular_price: 0,
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
        category: yup.number().required('Это обязательное поле'),
        regular_price: yup.number().required('Это обязательное поле'),
        min_quantity: yup.number().required('Это обязательное поле'),
    });

    const onSubmit = (formValues: Omit<IProductInfoDTO, 'category'> & { category: string | number }) => {
        const slug = slugify(transliterate(formValues.title));
        const result = { ...formValues, slug };
        console.log(result);
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
                min_quantity: product.min_quantity,
                description: product.description,
                is_popular: product.is_popular,
                category: product.category,
                title: product.title,
                unit: product.unit,
                slug: product.slug,
            });
        }
    }, [product, isCancel]);

    const categoryOptionsByParentId = useMemo(() => {
        if (categories?.length) {
            const categoryParents = categories.reduce(
                (
                    acc: {
                        [id: string]: {
                            category: ICategory;
                            children: (ICategory | (ICategory & { isGroup: boolean }))[];
                        };
                    },
                    category,
                ) => {
                    if (!category.parent) {
                        acc[category.id] = {
                            category,
                            children: [{ ...category, isGroup: true }, category],
                        };
                    }

                    return acc;
                },
                {},
            );

            categories.forEach((category) => {
                if (category.parent && categoryParents[category.parent]) {
                    categoryParents[category.parent].children.push(category);
                }
            });

            return categoryParents;
        }
        return [];
    }, []);

    const toggleDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen((prevState) => !prevState);
    };

    const onDeleteConfirm = () => {
        console.log('delete');
    };

    const onCancel = () => {
        setIsCancel({});
        formik.resetForm();
    };

    return (
        <div>
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
                        label="Описание (необязательно)"
                        fullWidth={true}
                        multiline
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-category_select-select-label">Категория</InputLabel>
                        <Select
                            labelId="category_select"
                            value={formik.values.category}
                            label="Категория"
                            error={formik.touched.category && Boolean(formik.errors.category)}
                            onChange={formik.handleChange}
                            name="category"
                        >
                            {Object.values(categoryOptionsByParentId).map((option) => {
                                return option.children.map((category) => {
                                    if ('isGroup' in category && category.isGroup) {
                                        return (
                                            <ListSubheader color="primary" key={`group_${category.id}`}>
                                                {category.name}
                                            </ListSubheader>
                                        );
                                    }
                                    return (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.name}
                                        </MenuItem>
                                    );
                                });
                            })}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="demo-units_select-select-label">Ед. измерения</InputLabel>
                        <Select
                            labelId="units_select"
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
                    <TextField
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
                                inputProps={{ 'aria-label': 'controlled' }}
                                onChange={formik.handleChange}
                                checked={formik.values.is_popular}
                                name={'is_popular'}
                            />
                        }
                        label="Отображать на главной странице?"
                    />
                    <Stack flexWrap="wrap" direction="row" alignItems="center" gap={1}>
                        <Button type="submit" variant={'contained'} color="success">
                            Сохранить изменения
                        </Button>
                        <Button onClick={onCancel} variant={'contained'} color="warning">
                            Отменить изменения
                        </Button>
                        {Boolean(product) && (
                            <Button onClick={toggleDeleteConfirmModal} variant={'contained'} color="error">
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
