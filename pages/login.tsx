import { NextPage } from 'next';
import LoginPage from '../components/LoginPage/LoginPage';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * Страница Входа
 */
const Login: NextPage = () => {
    return <LoginPage />;
};

export default withMainLayout(Login);
