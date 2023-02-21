import { catalogReducerValues } from '../../../../slices/Catalog/catalog';
import { categoryReducerValues } from '../../../../slices/Category/category';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { storeCategoriesByParentId } from '../../../../slices/Catalog/catalog';
import { ICategoriesByParentId } from '../../../../slices/Catalog/interfaces';
import { productReducerValues } from '../../../../slices/Product/product';
import { IProduct } from '../../../../models/Product';
import { cloneDeep } from 'lodash';

/** Кастомный хук для подготовки данных */
const usePrepareData = (filter: string) => {
    const [filteredProductsByCategory, setFilteredProductsByCategory] = useState<IProduct[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [sortedProducts, setSortedProducts] = useState<IProduct[]>([]);
    const { selectedCategoryId, categoriesByParentId } = useSelector(catalogReducerValues);
    const { categories } = useSelector(categoryReducerValues);
    const { products } = useSelector(productReducerValues);
    const dispatch = useDispatch();

    /** Фильтрация товаров по выбранной категории */
    useEffect(() => {
        if (products) {
            if (selectedCategoryId && categories && categoriesByParentId) {
                if (categoriesByParentId[selectedCategoryId]) {
                    const availableCategoriesIds = [
                        selectedCategoryId,
                        ...categoriesByParentId[selectedCategoryId].children.map((category) => category.id),
                    ];

                    setFilteredProductsByCategory(
                        products.filter((product) => availableCategoriesIds.includes(product.category)),
                    );
                } else {
                    setFilteredProductsByCategory(
                        products.filter((product) => product.category === selectedCategoryId),
                    );
                }
            } else {
                setFilteredProductsByCategory(cloneDeep(products));
            }
        }
    }, [products, selectedCategoryId, categories, categoriesByParentId]);

    /** фильтрация продуктов по значению из фильтра */
    useEffect(() => {
        if (filter) {
            setFilteredProducts(
                filteredProductsByCategory.filter((element) =>
                    element.title.toLowerCase().includes(filter.toLowerCase()),
                ),
            );
        } else {
            setFilteredProducts(filteredProductsByCategory);
        }
    }, [filter, filteredProductsByCategory]);

    /** Сортировка продуктов по цене */
    useEffect(() => {
        const sortedProducts = cloneDeep(filteredProducts).sort((a, b) => (a.regular_price > b.regular_price ? -1 : 1));
        setSortedProducts(sortedProducts);
    }, [filteredProducts]);

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

    return { products: sortedProducts };
};

export default usePrepareData;
