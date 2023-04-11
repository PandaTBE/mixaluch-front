import { NextPage } from 'next';
import RegisterPage from '../components/pages/RegisterPage/RegisterPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Страница регистрации
 */
const Register: NextPage = () => {
    return <MainLayout title={'Регистрация'}><RegisterPage /></MainLayout>;
};

export default Register;
