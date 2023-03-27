import OrderItem from './components/OrderItem/OrderItem';
import { OrderingPageContext } from '../../context';
import { Stack } from '@mui/material';
import { StyledDivider, Subtotal, SubtotalValue, SubtotalWrapper, Total, TotalValue, Wrapper } from './styles';
import { useContext, useMemo } from 'react';

/**
 * Компонент для отображения данных заказа (всех продуктов и стоимости)
 */
const Order = () => {
    const context = useContext(OrderingPageContext);

    const orderItems = useMemo(() => {
        if (context?.cartItems.length) {
            return context.cartItems.map((cartItem) => {
                return <OrderItem orderItem={cartItem} key={cartItem.id || cartItem.product.id} />;
            });
        }
        return null;
    }, [context?.cartItems]);

    return (
        <Wrapper>
            <Stack spacing={2}>{orderItems}</Stack>
            <StyledDivider />
            <SubtotalWrapper>
                <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
                    <Subtotal>Сумма по товарам:</Subtotal>
                    <SubtotalValue>{Math.floor(context?.totalSum || 0)} ₽</SubtotalValue>
                </Stack>
            </SubtotalWrapper>

            <SubtotalWrapper>
                <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
                    <Subtotal>Стоимость доставки:</Subtotal>
                    <SubtotalValue>{Math.floor(context?.deliveryCost || 0)} ₽</SubtotalValue>
                </Stack>
            </SubtotalWrapper>
            <StyledDivider />
            <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
                <Total>Итого:</Total>
                <TotalValue>{Math.floor(context?.totalSumWithDelivery || 0)} ₽</TotalValue>
            </Stack>
        </Wrapper>
    );
};

export default Order;
