import { storePopularProducts, storeProducts } from '../slices/Product/product';

import { CategoryApi } from '../api/CategoryApy';
import HomePage from '../components/HomePage/HomePage';
import { ICategory } from '../slices/Category/interfaces';
import { IProduct } from '../models/Product';
import type { NextPage } from 'next';
import { ProductApi } from '../api/ProductApi';
import axios from 'axios';
import { storeCategories } from '../slices/Category/category';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';
import { wrapper } from '../store';

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
        const categoriesRequest = CategoryApi.getCategories();
        const popularProdcutsRequest = ProductApi.getPopularProducts();

        await axios.all<IProduct[] | ICategory[]>([categoriesRequest, popularProdcutsRequest]).then((responses) => {
            const [categories, popularProducts] = responses as [ICategory[], IProduct[]];
            store.dispatch(storePopularProducts(popularProducts));
            store.dispatch(storeCategories(categories));
        });
    } catch (error) {
        console.log('error accured while getting initial data');
    }

    return {
        props: {},
    };
});

export default withMainLayout(Home);
