import { NextPage } from 'next';
import { wrapper } from '../../../store';
import { IEvotorProduct } from '../../../models/Evotor';
import { CategoryApi } from '../../../api/CategoryApi';
import { ProductApi } from '../../../api/ProductApi';
import { EvotorApi } from '../../../api/EvotorApi';
import { storeCategories } from '../../../slices/Category/category';
import { storeProducts } from '../../../slices/Product/product';
import { storeProductsByStoreId, storeStores } from '../../../slices/Evotor/evotor';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import StaffOnlyPage from '../../../layouts/StaffOnlyPage/StaffOnlyPage';
import AdminPageLayout from '../../../layouts/AdminPageLayout/AdminPageLayout';

const Products: NextPage = () => {
    return (
        <MainLayout title="Редактирование товаров">
            <StaffOnlyPage>
                <AdminPageLayout>
                    <div>Products</div>
                </AdminPageLayout>
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

export default Products;
