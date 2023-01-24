import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderApi } from '../../../services/OrderService';
import { orderReducerValues, storeSelectedOrder } from '../../../slices/Order/order';
import PageTitle from '../../PageTitle/PageTitle';
import OrderInfo from './components/OrderInfo/OrderInfo';
import OrderList from './components/OrderList/OrderList';
import { StyledDivider, SubTitle, Wrapper } from './styles';

/**
 * компонент для отображения страницы информации о конкретном заказе
 */
const OrderInfoPage = () => {
    const { selectedOrder } = useSelector(orderReducerValues);
    const { data } = orderApi.useGetOrderInfoQuery(selectedOrder?.id, {
        pollingInterval: 30000,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            dispatch(storeSelectedOrder(data));
        }
    }, [data]);
    return (
        <Wrapper>
            {selectedOrder ? (
                <>
                    <PageTitle>
                        <div>Заказ № {selectedOrder.id}</div>
                    </PageTitle>
                    <SubTitle>Информация о заказе</SubTitle>
                    <StyledDivider />
                    <OrderInfo order={selectedOrder} />
                    <StyledDivider />
                    <SubTitle>Cостав заказа</SubTitle>
                    <OrderList order={selectedOrder} />
                </>
            ) : (
                <div>Невозможно получить информацию о заказе</div>
            )}
        </Wrapper>
    );
};

export default OrderInfoPage;
