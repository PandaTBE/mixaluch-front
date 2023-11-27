import { NextPage } from 'next';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import StaffOnlyPage from '../../../layouts/StaffOnlyPage/StaffOnlyPage';
import EditProductPage from '../../../components/pages/EditProductPage/EditProductPage';
import { IProduct } from '../../../models/Product';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storeProducts, storeSelectedProduct } from '../../../slices/Product/product';
import { ICategory } from '../../../models/Category';
import { IEvotorStore } from '../../../models/Evotor';
import { TProductsByStoreId } from '../../../slices/Evotor/interfaces';
import { AdminProductsApi } from '../../../api/admin/products/AdminProductsApi';
import { storeProductsByStoreId, storeStores } from '../../../slices/Evotor/evotor';
import { storeCategories } from '../../../slices/Category/category';

const EditProduct: NextPage<{
    product?: IProduct | null;
    categories?: ICategory[] | null;
    products?: IProduct[] | null;
    stores?: IEvotorStore[];
    productsByStoreId?: TProductsByStoreId;
}> = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(storeProductsByStoreId(props.productsByStoreId || null));
        dispatch(storeSelectedProduct(props.product || null));
        dispatch(storeCategories(props.categories || null));
        dispatch(storeProducts(props.products || null));
        dispatch(storeStores(props.stores || []));
    }, [props]);
    return (
        <MainLayout title="Редактирование товаров">
            <StaffOnlyPage>
                <EditProductPage />
            </StaffOnlyPage>
        </MainLayout>
    );
};

export default EditProduct;

/**
 * Получение данных на сервере
 */
export const getServerSideProps = async (context?: { params?: { id: string } }) => {
    if (context?.params?.id) {
        try {
            const data = await AdminProductsApi.getAdminProductsPageData();

            const product = data.products?.find((item) => item.id === Number(context.params?.id));

            return {
                props: { ...data, product },
            };
        } catch (error) {
            return {
                props: {},
            };
        }
    }

    return {
        props: {},
    };
};
