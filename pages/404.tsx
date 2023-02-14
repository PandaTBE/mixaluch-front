import { NextPage } from 'next';
import NotFoundPage from '../components/pages/NotFoundPage/NotFoundPage';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * страница 404
 */
const NotFound: NextPage = () => {
    return <NotFoundPage />;
};

export default withMainLayout(NotFound);
