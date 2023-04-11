import { NextPage } from 'next';
import OrdersPage from '../../components/pages/OrdersPage/OrdersPage';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import UserAccountSidebarLayout from '../../layouts/UserAccountSidebarLayout/UserAccountSidebarLayout';

/**
 * Страница истории заказов
 */
const Orders: NextPage = () => {
    return (
        <MainLayout title={'История заказов'}>
            <UserAccountSidebarLayout>
                <OrdersPage />
            </UserAccountSidebarLayout>
        </MainLayout>
    );
};

export default Orders;
