import Delivery from './comonents/Delivery/Delivery';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import generateOrderQueryData from './tools/generateOrderQueryData';
import Order from './comonents/Order/Order';
import PageTitle from '../../PageTitle/PageTitle';
import UserInfo from './comonents/UserInfo/UserInfo';
import { Accordion, AccordionDetails, AccordionSummary, Stack } from '@mui/material';
import { AccordionWrapper, ErrorWrapper, OrderWrapper, Total, TotalValue, Wrapper, WrapperItem } from './styles';
import { IOrderFormValues } from './comonents/Delivery/interfaces';
import { orderApi } from '../../../services/OrderService';
import { OrderingPageContext } from './context';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { userReducerValues } from '../../../slices/User/user';
import {
    cartReducerValues,
    storeCartItems,
    storeCartItemsRefetchObject,
    storeDeliveryCost,
} from '../../../slices/Cart/cart';
import { CART_ITEMS_LOCAL_STORAGE_KEY, LAST_ORDER_ID_LOCAL_STORAGE_KEY } from '../../../constants/constants';
import { storeLastOrderId } from '../../../slices/Order/order';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

/**
 * Компонент для отображения страницы оформления заказа
 */
const OrderingPage = () => {
    const [createOrder, { data, isLoading, isError }] = orderApi.useCreateOrderMutation();
    const { totalSum, cartItems, deliveryCost, totalSumWithDelivery } = useSelector(cartReducerValues);
    const [accordionExpanded, setAccordionExpanded] = useState(false);
    const { user, authToken } = useSelector(userReducerValues);
    const router = useRouter();

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            router.push(`/orders/${data.id}`);
            localStorage.setItem(LAST_ORDER_ID_LOCAL_STORAGE_KEY, data.id.toString());
            localStorage.setItem(CART_ITEMS_LOCAL_STORAGE_KEY, '[]');
            dispatch(storeCartItemsRefetchObject());
            dispatch(storeLastOrderId(data.id));
            dispatch(storeCartItems([]));
        }
    }, [data]);

    const toggleAccordionExpanded = () => {
        setAccordionExpanded((prevState) => !prevState);
    };

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
            <PageTitle text={'Оформление заказа'} />
            {isError && (
                <ErrorWrapper>
                    <ErrorMessage
                        text={
                            'При оформлении заказа возникла ошибка, попробуйте позже или свяжитесь с нами по телефону!'
                        }
                    />
                </ErrorWrapper>
            )}
            <Wrapper>
                <WrapperItem>
                    {user && <UserInfo />}
                    <Delivery />
                </WrapperItem>
                <WrapperItem>
                    <AccordionWrapper>
                        <Accordion expanded={accordionExpanded} onChange={toggleAccordionExpanded}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Stack
                                    flexGrow={1}
                                    direction={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                >
                                    <Total>Ваш заказа</Total>
                                    <TotalValue>{Math.floor(context?.totalSumWithDelivery || 0)} ₽</TotalValue>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Order />
                            </AccordionDetails>
                        </Accordion>
                    </AccordionWrapper>
                    <OrderWrapper>
                        <Order />
                    </OrderWrapper>
                </WrapperItem>
            </Wrapper>
        </OrderingPageContext.Provider>
    );
};

export default OrderingPage;
