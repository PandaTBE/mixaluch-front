import { NextPage } from 'next';
import CartPage from '../components/CartPage/CartPage';
import { withMainLayout } from '../layouts/MainLayout/MainLayout';

/**
 * Страница корзины
 */
const Cart: NextPage = () => {
    return <CartPage />;
};

export default withMainLayout(Cart);
