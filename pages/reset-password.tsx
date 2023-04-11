import ResetPasswordPage from '../components/pages/ResetPasswordPage/ResetPasswordPage';
import { NextPage } from 'next';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Страница восстановления пароля
 */
const ResetPassword: NextPage = () => {
    return <MainLayout title={'Восстановление пароля'}><ResetPasswordPage /></MainLayout>;
};

export default ResetPassword;
