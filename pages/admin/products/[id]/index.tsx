import MainLayout from '../../../../layouts/MainLayout/MainLayout';
import StaffOnlyPage from '../../../../layouts/StaffOnlyPage/StaffOnlyPage';
import AdminReturnToProductsLayout from '../../../../layouts/AdminReturnToProductsLayout/AdminReturnToProductsLayout';
import EditProductPage from '../../../../components/pages/admin/EditProductPage/EditProductPage';

const ProductEditor = () => (
    <MainLayout title="Редактирование товара">
        <StaffOnlyPage>
            <AdminReturnToProductsLayout>
                <EditProductPage />
            </AdminReturnToProductsLayout>
        </StaffOnlyPage>
    </MainLayout>
);

export default ProductEditor;
