import { NextPage } from 'next';
import OrderingPage from '../components/pages/OrderingPage/OrderingPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Страница оформления заказа
 */
const Ordering: NextPage = () => {
    return (
        <MainLayout title={'Оформление заказа'}>
            <OrderingPage />
        </MainLayout>
    );
};

export default Ordering;
