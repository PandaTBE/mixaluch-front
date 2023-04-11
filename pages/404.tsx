import { NextPage } from 'next';
import NotFoundPage from '../components/pages/NotFoundPage/NotFoundPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * страница 404
 */
const NotFound: NextPage = () => {
    return <MainLayout><NotFoundPage /></MainLayout>;
};

export default NotFound;
