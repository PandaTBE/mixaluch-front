import { NextPage } from 'next';
import ServerErrorPage from '../components/pages/ServerErrorPage/ServerErrorPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Страница ошибки сервера (500)
 */
const ServerError: NextPage = () => {
    return (
        <MainLayout>
            <ServerErrorPage />
        </MainLayout>
    );
};

export default ServerError;
