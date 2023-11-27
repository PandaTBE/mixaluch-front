import { NextPage } from 'next';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import StaffOnlyPage from '../../layouts/StaffOnlyPage/StaffOnlyPage';
import AdminPage from '../../components/pages/AdminPage/AdminPage';
import AdminPageLayout from '../../layouts/AdminPageLayout/AdminPageLayout';

const Admin: NextPage = () => {
    return (
        <MainLayout title={'Панель администратора'}>
            <StaffOnlyPage>
                <AdminPageLayout>
                    <AdminPage />
                </AdminPageLayout>
            </StaffOnlyPage>
        </MainLayout>
    );
};

export default Admin;
