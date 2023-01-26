import useFetchData from './hooks/useFetchData';

/**
 * Компонент для отображения истории заказов
 */
const OrdersPage = () => {
    useFetchData();
    return <div>orders</div>;
};

export default OrdersPage;
