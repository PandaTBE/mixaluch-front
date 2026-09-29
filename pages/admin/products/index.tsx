import { NextPage } from 'next';
import MainLayout from '../../../layouts/MainLayout/MainLayout';
import StaffOnlyPage from '../../../layouts/StaffOnlyPage/StaffOnlyPage';
import AdminPageLayout from '../../../layouts/AdminPageLayout/AdminPageLayout';
import AdminProductsPage from '../../../components/pages/admin/AdminProductsPage/AdminProductsPage';

const Products: NextPage = () => (
    <MainLayout title="Редактирование товаров">
        <StaffOnlyPage>
            <AdminPageLayout>
                <AdminProductsPage />
            </AdminPageLayout>
        </StaffOnlyPage>
    </MainLayout>
);

export default Products;
