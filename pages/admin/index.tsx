import { NextPage } from 'next';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { wrapper } from '../../store';
import { ProductApi } from '../../api/ProductApi';
import { CategoryApi } from '../../api/CategoryApi';
import { storeCategories } from '../../slices/Category/category';
import { storeProducts } from '../../slices/Product/product';
import StaffOnlyPage from '../../layouts/StaffOnlyPage/StaffOnlyPage';
import AdminPage from '../../components/pages/AdminPage/AdminPage';
import { EvotorApi } from '../../api/EvotorApi';
import { IEvotorProduct } from '../../models/Evotor';
import { storeProductsByStoreId, storeStores } from '../../slices/Evotor/evotor';

const Admin: NextPage = () => {
    return (
        <MainLayout title={'Панель администратора'}>
            <StaffOnlyPage>
                <AdminPage />
            </StaffOnlyPage>
        </MainLayout>
    );
};

/**
 * Получение данных на сервере
 */
export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    try {
        const productsPromises: Promise<{ data: IEvotorProduct[]; storeId: string }>[] = [];

        const categoriesRequest = CategoryApi.getCategories();
        const productsRequest = ProductApi.getProducts();
        const storesRequest = EvotorApi.getAllStores();

        await Promise.all([categoriesRequest, productsRequest, storesRequest]).then(
            ([categories, products, stores]) => {
                store.dispatch(storeCategories(categories));
                store.dispatch(storeProducts(products));
                store.dispatch(storeStores(stores));

                stores.forEach((store) => {
                    productsPromises.push(
                        EvotorApi.getProductsByStoreId(store.uuid).then((response) => ({
                            data: response,
                            storeId: store.uuid,
                        })),
                    );
                });
            },
        );

        await Promise.all(productsPromises).then((responses) => {
            const result = responses.reduce((acc, value) => {
                acc[value.storeId] = value.data;
                return acc;
            }, {} as { [storeId: string]: IEvotorProduct[] });
            store.dispatch(storeProductsByStoreId(result));
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
