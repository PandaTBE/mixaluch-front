import { NextPage } from 'next';
import { OrderApi } from '../../api/OrderApi';
import OrderInfoPage from '../../components/pages/OrderInfoPage/OrderInfoPage';
import { storeSelectedOrder } from '../../slices/Order/order';
import { wrapper } from '../../store';
import MainLayout from '../../layouts/MainLayout/MainLayout';

/**
 * Отображение страницы конкретного заказа
 */
const OrderInfo: NextPage = () => {
    return (
        <MainLayout title={'Информация о заказе'}>
            <OrderInfoPage />
        </MainLayout>
    );
};

export default OrderInfo;

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
