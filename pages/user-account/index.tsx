import { NextPage } from 'next';
import UserAccountPage from '../../components/pages/UserAccountPage/UserAccountPage';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { withUserAccountSidebar } from '../../layouts/UserAccountSidebarLayout/UserAccountSidebarLayout';

/**
 * Страница авторизованного пользователя
 */
const UserAccount: NextPage = () => {
    return <UserAccountPage />;
};

export default withMainLayout(withUserAccountSidebar(UserAccount), 'Личный кабинет');
