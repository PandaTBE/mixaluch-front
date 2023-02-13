import { NextPage } from 'next';
import { OrderApi } from '../../api/OrderApi';
import OrderInfoPage from '../../components/pages/OrderInfoPage/OrderInfoPage';
import { withMainLayout } from '../../layouts/MainLayout/MainLayout';
import { storeSelectedOrder } from '../../slices/Order/order';
import { wrapper } from '../../store';

/**
 * Отображение страницы конкретного заказа
 */
const OrderInfo: NextPage = () => {
    return <OrderInfoPage />;
};

export default withMainLayout(OrderInfo);

/**
 * Получение данных на сервере
 */
export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    if (context?.params?.id) {
        try {
            const orderInfo = await OrderApi.getOrderInfo(Number(context?.params.id));

            store.dispatch(storeSelectedOrder(orderInfo));
        } catch (error) {
            console.log(error);

            return {
                props: {},
            };
        }
    }

    return {
        props: {},
    };
});
