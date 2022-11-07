import { NextPage } from 'next';
import UserAccountPage from '../../components/UserAccountPage/UserAccountPage';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';

/**
 * Страница авторизованного пользователя
 */
const UserAccount: NextPage = () => {
    return <UserAccountPage />;
};

export default withMainLayout(UserAccount);
