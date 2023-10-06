import { NextPage } from 'next';
import MainLayout from '../layouts/MainLayout/MainLayout';
import AdminPage from '../components/pages/AdminPage/AdminPage';

/**
 * Компонент для отображения страницы "О компании"
 */
const Admin: NextPage = () => {
    return (
        <MainLayout title={'Панель администратора'}>
            <AdminPage />
        </MainLayout>
    );
};

export default Admin;
