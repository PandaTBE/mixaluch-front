import { NextPage } from 'next';
import ServerErrorPage from '../components/pages/ServerErrorPage/ServerErrorPage';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * страница 404
 */
const ServerError: NextPage = () => {
    return <ServerErrorPage />;
};

export default withMainLayout(ServerError);
