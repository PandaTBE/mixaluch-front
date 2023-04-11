import { NextPage } from 'next';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Страница Входа
 */
const Login: NextPage = () => {
    return (
        <MainLayout title={'Авторизация'}>
            <LoginPage />
        </MainLayout>
    );
};

export default Login;
