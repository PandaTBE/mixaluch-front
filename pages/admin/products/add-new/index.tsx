import { NextPage } from 'next';
import MainLayout from '../../../../layouts/MainLayout/MainLayout';
import StaffOnlyPage from '../../../../layouts/StaffOnlyPage/StaffOnlyPage';
import AdminReturnToProductsLayout from '../../../../layouts/AdminReturnToProductsLayout/AdminReturnToProductsLayout';
import AddNewProductPage from '../../../../components/pages/admin/AddNewProductPage/AddNewProductPage';
import { AdminProductsApi } from '../../../../api/admin/products/AdminProductsApi';
import { TProductsByStoreId } from '../../../../slices/Evotor/interfaces';
import { IEvotorStore } from '../../../../models/Evotor';
import { IProduct } from '../../../../models/Product';
import { ICategory } from '../../../../models/Category';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storeProductsByStoreId, storeStores } from '../../../../slices/Evotor/evotor';
import { storeCategories } from '../../../../slices/Category/category';
import { storeProducts } from '../../../../slices/Product/product';

const AddNew: NextPage<{
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
        <MainLayout title="Добавление товара">
            <StaffOnlyPage>
                <AdminReturnToProductsLayout>
                    <AddNewProductPage />
                </AdminReturnToProductsLayout>
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

export default AddNew;
