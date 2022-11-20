import { catalogReducerValues } from './../../../slices/Catalog/catalog';
import { categoryReducerValues } from './../../../slices/Category/category';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { storeCategoriesByParentId } from '../../../slices/Catalog/catalog';
import { ICategoriesByParentId } from '../../../slices/Catalog/interfaces';
import { productReducerValues } from '../../../slices/Product/product';
import { IProduct } from '../../../models/Product';
import { cloneDeep } from 'lodash';

/** Кастомный хук для подготовки данных */
const usePrepareData = () => {
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const { selectedCategoryId, categoriesByParentId } = useSelector(catalogReducerValues);
    const { categories } = useSelector(categoryReducerValues);
    const { products } = useSelector(productReducerValues);
    const dispatch = useDispatch();

    /** Фильтрация товаров по выбранной категории */
    useEffect(() => {
        if (products) {
            if (selectedCategoryId && categories && categoriesByParentId) {
                if (categoriesByParentId[selectedCategoryId]) {
                    const availableCategoriesIds = categoriesByParentId[selectedCategoryId].children.map(
                        (category) => category.id,
                    );
                    setFilteredProducts(
                        products.filter((product) => availableCategoriesIds.includes(product.category)),
                    );
                } else {
                    setFilteredProducts(products.filter((product) => product.category === selectedCategoryId));
                }
            } else {
                setFilteredProducts(cloneDeep(products));
            }
        }
    }, [products, selectedCategoryId, categories, categoriesByParentId]);

    /** Получение объекта категорий где ключ это id главной категории */
    useEffect(() => {
        if (categories) {
            const result = categories.reduce((acc: ICategoriesByParentId, value) => {
                if (value.parent === null) {
                    const children = categories.filter((element) => element.parent === value.id);
                    acc[value.id] = {
                        parent: value,
                        children,
                    };
                }
                return acc;
            }, {});
            dispatch(storeCategoriesByParentId(result));
        }
    }, [categories]);

    return { filteredProducts };
};

export default usePrepareData;
