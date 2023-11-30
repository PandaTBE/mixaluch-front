import { NextPage } from 'next';
import { IEvotorStore } from '../../../models/Evotor';
import { storeCategories } from '../../../slices/Category/category';
import { storeProducts } from '../../../slices/Product/product';
import { storeProductsByStoreId, storeStores } from '../../../slices/Evotor/evotor';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import StaffOnlyPage from '../../../layouts/StaffOnlyPage/StaffOnlyPage';
import AdminPageLayout from '../../../layouts/AdminPageLayout/AdminPageLayout';
import AdminProductsPage from '../../../components/pages/admin/AdminProductsPage/AdminProductsPage';
import { ICategory } from '../../../models/Category';
import { IProduct } from '../../../models/Product';
import { TProductsByStoreId } from '../../../slices/Evotor/interfaces';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AdminProductsApi } from '../../../api/admin/products/AdminProductsApi';
import stores from '../../../stores.json';
import productsByStoreId from '../../../productsByStoreId.json';

const Products: NextPage<{
    categories?: ICategory[] | null;
    products?: IProduct[] | null;
    stores?: IEvotorStore[];
    productsByStoreId?: TProductsByStoreId;
}> = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(storeProductsByStoreId(props.productsByStoreId || null));
        dispatch(storeCategories(props.categories || null));
        dispatch(storeProducts(props.products || null));
        dispatch(storeStores(props.stores || []));
    }, [props]);

    return (
        <MainLayout title="Редактирование товаров">
            <StaffOnlyPage>
                <AdminPageLayout>
                    <AdminProductsPage />
                </AdminPageLayout>
            </StaffOnlyPage>
        </MainLayout>
    );
};

/**
 * Получение данных на сервере
 */
export const getServerSideProps = async () => {
    try {
        const data = await AdminProductsApi.getAdminProductsPageData();

        return {
            props: { ...data },
        };
    } catch (error) {
        return {
            props: {},
        };
    }
};

export default Products;
