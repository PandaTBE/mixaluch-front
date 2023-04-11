import { storePopularProducts } from '../slices/Product/product';

import { CategoryApi } from '../api/CategoryApi';
import HomePage from '../components/pages/HomePage/HomePage';
import { IProduct } from '../models/Product';
import type { NextPage } from 'next';
import { ProductApi } from '../api/ProductApi';
import axios from 'axios';
import { storeMainCategories } from '../slices/Category/category';
import { wrapper } from '../store';
import { ICategory } from '../models/Category';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Компонент для отображения домашней страницы
 */
const Home: NextPage = () => {
    return (
        <MainLayout>
            <HomePage />
        </MainLayout>
    );
};

/**
 * Получение данных на сервере
 */
export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    try {
        const mainCategoriesRequest = CategoryApi.getMainCategories();
        const popularProductsRequest = ProductApi.getPopularProducts();
        await axios.all<IProduct[] | ICategory[]>([mainCategoriesRequest, popularProductsRequest]).then((responses) => {
            const [mainCategories, popularProducts] = responses as [ICategory[], IProduct[]];
            store.dispatch(storePopularProducts(popularProducts));
            store.dispatch(storeMainCategories(mainCategories));
        });
    } catch (error) {
        console.log('Home page error>>>>   ', error);

        return {
            props: {},
            revalidate: 10,
        };
    }

    return {
        props: {},
        revalidate: 10,
    };
});

export default Home;
