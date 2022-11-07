import { CategoryApi } from '../api/CategoryApy';
import HomePage from '../components/HomePage/HomePage';
import { ICategory } from '../slices/Category/interfaces';
import { IProduct } from '../slices/Product/interfaces';
import type { NextPage } from 'next';
import { ProductApi } from '../api/ProductApi';
import axios from 'axios';
import { storeCategories } from '../slices/Category/category';
import { storeProducts } from '../slices/Product/product';
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
        const productsRequest = ProductApi.getProducts();
        const categoriesRequest = CategoryApi.getCategories();

        await axios.all<IProduct[] | ICategory[]>([productsRequest, categoriesRequest]).then((responses) => {
            const [products, categories] = responses as [IProduct[], ICategory[]];
            store.dispatch(storeCategories(categories));
            store.dispatch(storeProducts(products));
        });
    } catch (error) {
        console.log(error);
    }

    return {
        props: {},
    };
});

export default withMainLayout(Home);
