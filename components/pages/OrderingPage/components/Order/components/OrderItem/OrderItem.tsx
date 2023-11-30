import { Stack } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { IExtendedCartItem } from '../../../../../../../slices/Cart/interfaces';
import { OrderItemImageWrapper, ProductTitle, QuantityWrapper } from './styles';
import { IProductImage } from '../../../../../../../models/Product';

interface IProps {
    /** Элемент заказа (продукт) */
    orderItem: IExtendedCartItem;
}

/**
 * Компонент для отображения элемента заказа (продутка)
 */
const OrderItem: FC<IProps> = ({ orderItem }) => {
    const productImage =
        orderItem.product.product_image.find((image) => image.is_feature) ||
        (orderItem.product.product_image[0] as IProductImage | undefined);

    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2}>
                <OrderItemImageWrapper>
                    <Image src={productImage?.image || ''} alt={productImage?.alt_text} layout="fill" />
                </OrderItemImageWrapper>
                <ProductTitle>{orderItem.product.title}</ProductTitle>
            </Stack>
            <QuantityWrapper>
                {orderItem.quantity} x <span>{orderItem.product.regular_price} ₽</span>
            </QuantityWrapper>
        </Stack>
    );
};

export default OrderItem;
