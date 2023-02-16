import { NextPage } from 'next';
import DeliveryPage from '../components/pages/DeliveryPage/DeliveryPage';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * Страница доставки
 */
const Delivery: NextPage = () => {
    return <DeliveryPage />;
};

export default withMainLayout(Delivery, 'Информация о доставке');
