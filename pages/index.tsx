import { storePopularProducts } from '../slices/Product/product';

import { CategoryApi } from '../api/CategoryApi';
import HomePage from '../components/pages/HomePage/HomePage';
import { IProduct } from '../models/Product';
import type { NextPage } from 'next';
import { ProductApi } from '../api/ProductApi';
import axios from 'axios';
import { storeMainCategories } from '../slices/Category/category';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';
import { wrapper } from '../store';
import { ICategory } from '../models/Category';

/**
 * Компонент для отображения домашней страницы
 */
const Home: NextPage = () => {
    return <HomePage />;
};

/**
 * Получение данных на сервере
 */
export const getServerSideProps = wrapper.getStaticProps((store) => async () => {
    try {
        const mainCategoriesRequest = CategoryApi.getMainCategories();
        const popularProdcutsRequest = ProductApi.getPopularProducts();
        await axios.all<IProduct[] | ICategory[]>([mainCategoriesRequest, popularProdcutsRequest]).then((responses) => {
            const [mainCategories, popularProducts] = responses as [ICategory[], IProduct[]];
            store.dispatch(storePopularProducts(popularProducts));
            store.dispatch(storeMainCategories(mainCategories));
        });
    } catch (error) {
        return {
            props: {},
        };
    }

    return {
        props: {},
    };
});

export default withMainLayout(Home);
