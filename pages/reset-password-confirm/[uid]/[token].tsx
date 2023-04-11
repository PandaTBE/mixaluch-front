import ResetPasswordConfirmPage from '../../../components/pages/ResetPasswordConfirmPage/ResetPasswordConfirmPage';
import { NextPage } from 'next';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

/**
 * Страница подтверждения сброса пароля
 */
const ResetPasswordConfirm: NextPage = () => {
    return (
        <MainLayout title={'Сброс пароля'}>
            <ResetPasswordConfirmPage />
        </MainLayout>
    );
};

export default ResetPasswordConfirm;
