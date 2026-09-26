import { ItemRow, NegotiableQuantity, ProductDetails } from './styles';
import Image from 'next/image';
import { FC } from 'react';
import { IExtendedCartItem } from '../../../../../../../slices/Cart/interfaces';
import { OrderItemImageWrapper, ProductTitle, QuantityWrapper } from './styles';
import { IProductImage } from '../../../../../../../models/Product';
import { formatProductPrice } from '../../../../../../../tools/productPrice';
import NegotiablePrice from '../../../../../../NegotiablePrice/NegotiablePrice';
import { useTranslation } from 'react-i18next';

interface IProps {
    /** Элемент заказа (продукт) */
    orderItem: IExtendedCartItem;
}

/**
 * Компонент для отображения элемента заказа (продутка)
 */
const OrderItem: FC<IProps> = ({ orderItem }) => {
    const { t } = useTranslation();
    const productImage =
        orderItem.product.product_image.find((image) => image.is_feature) ||
        (orderItem.product.product_image[0] as IProductImage | undefined);

    return (
        <ItemRow direction={'row'} spacing={2}>
            <ProductDetails direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <OrderItemImageWrapper>
                    <Image src={productImage?.image || ''} alt={productImage?.alt_text} layout="fill" />
                </OrderItemImageWrapper>
                <ProductTitle>{orderItem.product.title}</ProductTitle>
            </ProductDetails>
            <QuantityWrapper>
                {orderItem.product.is_negotiable_price ? (
                    <NegotiableQuantity spacing={0.5}>
                        <div>
                            {orderItem.quantity} {t(orderItem.product.unit)}
                        </div>
                        <NegotiablePrice />
                    </NegotiableQuantity>
                ) : (
                    <>
                        {orderItem.quantity} x <span>{formatProductPrice(orderItem.product)}</span>
                    </>
                )}
            </QuantityWrapper>
        </ItemRow>
    );
};

export default OrderItem;
