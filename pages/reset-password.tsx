import ResetPasswordPage from '../components/pages/ResetPasswordPage/ResetPasswordPage';
import { NextPage } from 'next';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * Страница восстановления пароля
 */
const ResetPassword: NextPage = () => {
    return <ResetPasswordPage />;
};

export default withMainLayout(ResetPassword, 'Восстановление пароля');
