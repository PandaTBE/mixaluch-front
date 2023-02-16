import { NextPage } from 'next';
import OrderingPage from '../components/pages/OrderingPage/OrderingPage';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * Страница оформления заказа
 */
const Ordering: NextPage = () => {
    return <OrderingPage />;
};

export default withMainLayout(Ordering, 'Оформление заказа');
