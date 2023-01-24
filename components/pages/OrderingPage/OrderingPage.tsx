import Delivery from './comonents/Delivery/Delivery';
import PageTitle from '../../PageTitle/PageTitle';
import UserInfo from './comonents/UserInfo/UserInfo';
import { OrderingPageContext } from './context';
import {
    cartReducerValues,
    storeCartItems,
    storeCartItemsRefetchObject,
    storeDeliveryCost,
} from '../../../slices/Cart/cart';
import { useDispatch, useSelector } from 'react-redux';
import { userReducerValues } from '../../../slices/User/user';
import { Wrapper, WrapperItem } from './styles';
import Order from './comonents/Order/Order';
import { orderApi } from '../../../services/OrderService';
import { IOrderFormValues } from './comonents/Delivery/interfaces';
import generateOrderQueryData from './tools/generateOrderQueryData';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Компонент для отображения страницы оформления заказа
 */
const OrderingPage = () => {
    const [createOrder, { data, isLoading }] = orderApi.useCreateOrderMutation();
    const { totalSum, cartItems, deliveryCost, totalSumWithDelivery } = useSelector(cartReducerValues);
    const { user, authToken } = useSelector(userReducerValues);
    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            router.push(`/orders/${data.id}`);
            dispatch(storeCartItemsRefetchObject());
            dispatch(storeCartItems([]));
        }
    }, [data]);

    const storeDeliveryCostTrans = (value: number) => {
        dispatch(storeDeliveryCost(value));
    };

    const createOrderTrans = (formValues: IOrderFormValues) => {
        const body = generateOrderQueryData({
            orderItems: cartItems,
            totalSumWithDelivery,
            deliveryCost,
            formValues,
            totalSum,
        });
        createOrder({ authToken, body });
    };

    const context = {
        createOrderFetching: isLoading,
        totalSumWithDelivery,
        deliveryCost,
        cartItems,
        totalSum,
        user,
        storeDeliveryCostTrans,
        createOrderTrans,
    };

    return (
        <OrderingPageContext.Provider value={context}>
            <Wrapper>
                <WrapperItem>
                    <PageTitle>
                        <div>Оформление заказа</div>
                    </PageTitle>
                    {user && <UserInfo />}
                    <Delivery />
                </WrapperItem>
                <WrapperItem>
                    <Order />
                </WrapperItem>
            </Wrapper>
        </OrderingPageContext.Provider>
    );
};

export default OrderingPage;
