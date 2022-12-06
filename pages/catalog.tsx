import { default as CatalogPage } from '../components/pages/CatalogPage/Catalog';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';
import type { NextPage } from 'next';
import { wrapper } from '../store';
import { ProductApi } from '../api/ProductApi';
import { CategoryApi } from '../api/CategoryApi';
import axios from 'axios';
import { storeCategories } from '../slices/Category/category';
import { storeProducts } from '../slices/Product/product';
import { IProduct } from '../models/Product';
import { ICategory } from '../models/Category';

/**
 * Страница каталога
 */
const Catalog: NextPage = () => {
    return <CatalogPage />;
};

/**
 * Получение данных на сервере
 */
export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
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

export default withMainLayout(Catalog);
