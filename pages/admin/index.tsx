import { NextPage } from 'next';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { wrapper } from '../../store';
import { ProductApi } from '../../api/ProductApi';
import axios from 'axios';
import { IProduct } from '../../models/Product';
import { ICategory } from '../../models/Category';
import { CategoryApi } from '../../api/CategoryApi';
import { storeCategories } from '../../slices/Category/category';
import { storeProducts } from '../../slices/Product/product';

const Admin: NextPage = () => {
    return (
        <MainLayout title={'Панель администратора'}>
            <div>admin</div>
        </MainLayout>
    );
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
        return {
            props: {},
        };
    }

    return {
        props: {},
    };
});

export default Admin;
