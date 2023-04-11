import ActivatePage from '../../../components/pages/ActivatePage/ActivatePage';
import { NextPage } from 'next';
import MainLayout from '../../../layouts/MainLayout/MainLayout';

/**
 * Страница активации аккаунта после регистрации
 */
const Activate: NextPage = () => {
    return <MainLayout title={'Активация аккаунта'}><ActivatePage /></MainLayout>;
};

export default Activate;
