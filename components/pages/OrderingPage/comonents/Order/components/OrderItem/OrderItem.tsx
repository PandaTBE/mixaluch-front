import { Grid, Stack } from '@mui/material';
import { FC } from 'react';
import { IExtendedCartItem } from '../../../../../../../slices/Cart/interfaces';
import { OrderItemImage, QuantityWrapper } from './styles';

interface IProps {
    /** Элемент заказа (продукт) */
    orderItem: IExtendedCartItem;
}

/**
 * Компонент для отображения элемента заказа (продутка)
 */
const OrderItem: FC<IProps> = ({ orderItem }) => {
    const productImage =
        orderItem.product.product_image.find((image) => image.is_feature) || orderItem.product.product_image[0];

    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                <OrderItemImage src={productImage.image} alt={productImage.alt_text} />
                <div>{orderItem.product.title}</div>
            </Stack>
            <QuantityWrapper>
                {orderItem.quantity} x <span>{orderItem.product.regular_price} ₽</span>
            </QuantityWrapper>
        </Stack>
    );
};

export default OrderItem;
