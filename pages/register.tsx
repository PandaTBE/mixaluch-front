import { NextPage } from 'next';
import RegisterPage from '../components/pages/RegisterPage/RegisterPage';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * Страница регистрации
 */
const Register: NextPage = () => {
    return <RegisterPage />;
};

export default withMainLayout(Register);
