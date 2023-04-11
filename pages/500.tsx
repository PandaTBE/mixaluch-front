import { NextPage } from 'next';
import ServerErrorPage from '../components/pages/ServerErrorPage/ServerErrorPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * страница 404
 */
const ServerError: NextPage = () => {
    return <MainLayout><ServerErrorPage /></MainLayout>;
};

export default ServerError;
