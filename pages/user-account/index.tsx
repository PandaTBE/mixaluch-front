import { NextPage } from 'next';
import UserAccountPage from '../../components/pages/UserAccountPage/UserAccountPage';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import UserAccountSidebarLayout from '../../layouts/UserAccountSidebarLayout/UserAccountSidebarLayout';

/**
 * Страница авторизованного пользователя
 */
const UserAccount: NextPage = () => {
    return (
        <MainLayout title={'Личный кабинет'}>
            <UserAccountSidebarLayout>
                <UserAccountPage />
            </UserAccountSidebarLayout>
        </MainLayout>
    );
};

export default UserAccount;
