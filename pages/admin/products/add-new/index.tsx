import MainLayout from '../../../../layouts/MainLayout/MainLayout';
import StaffOnlyPage from '../../../../layouts/StaffOnlyPage/StaffOnlyPage';
import AdminReturnToProductsLayout from '../../../../layouts/AdminReturnToProductsLayout/AdminReturnToProductsLayout';
import AddNewProductPage from '../../../../components/pages/admin/AddNewProductPage/AddNewProductPage';

const ProductEditor = () => (
    <MainLayout title="Добавление товара">
        <StaffOnlyPage>
            <AdminReturnToProductsLayout>
                <AddNewProductPage />
            </AdminReturnToProductsLayout>
        </StaffOnlyPage>
    </MainLayout>
);

export default ProductEditor;
