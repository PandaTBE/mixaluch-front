import { NextPage } from 'next';
import DeliveryPage from '../components/pages/DeliveryPage/DeliveryPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Страница доставки
 */
const Delivery: NextPage = () => {
    return <MainLayout title={'Доставка – Интернет-магазин У Михалыча'}><DeliveryPage /></MainLayout>;
};

export default Delivery;
