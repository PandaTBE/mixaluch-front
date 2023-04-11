import { NextPage } from 'next';
import CartPage from '../components/pages/CartPage/CartPage';
import MainLayout from '../layouts/MainLayout/MainLayout';

/**
 * Страница корзины
 */
const Cart: NextPage = () => {
    return <MainLayout title={"Корзина"}><CartPage /></MainLayout>;
};

export default Cart;
