import { withMainLayout } from '../layouts/MainLayout/MainLayout';
import { storeCategories } from '../slices/Category/category';
import { ICategory } from '../slices/Category/interfaces';
import { storeProducts } from '../slices/Product/product';
import { IProduct } from '../slices/Product/interfaces';
import { CategoryApi } from '../api/CategoryApy';
import { ProductApi } from '../api/ProductApi';
import type { NextPage } from 'next';
import { wrapper } from '../store';
import axios from 'axios';

/**
 * Компонент для отображения домашней страницы
 */
const Home: NextPage = () => {
    return <div>123</div>;
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
