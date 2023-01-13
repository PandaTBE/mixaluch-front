import ResetPasswordConfirmPage from '../../../components/pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage';
import { NextPage } from 'next';
import { withMainLayout } from '../../../layouts/MainLayout/MainLayout';

/**
 * Страница активации аккаунта после регистрации
 */
const ResetPasswordConfirm: NextPage = () => {
    return <ResetPasswordConfirmPage />;
};

export default withMainLayout(ResetPasswordConfirm);
