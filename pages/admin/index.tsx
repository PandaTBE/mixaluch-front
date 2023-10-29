import { NextPage } from 'next';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import StaffOnlyPage from '../../layouts/StaffOnlyPage/StaffOnlyPage';
import AdminPage from '../../components/pages/AdminPage/AdminPage';

const Admin: NextPage = () => {
    return (
        <MainLayout title={'Панель администратора'}>
            <StaffOnlyPage>
                <AdminPage />
            </StaffOnlyPage>
        </MainLayout>
    );
};

export default Admin;
