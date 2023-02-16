import { NextPage } from 'next';
import OrdersPage from '../../components/pages/OrdersPage/OrdersPage';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { withUserAccountSidebar } from '../../layouts/UserAccountSidebarLayout/UserAccountSidebarLayout';

/**
 * Страница истории заказов
 */
const Orders: NextPage = () => {
    return <OrdersPage />;
};

export default withMainLayout(withUserAccountSidebar(Orders), 'История заказов');
