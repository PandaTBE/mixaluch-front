import { Stack } from '@mui/material';
import { FC } from 'react';
import { IExtendedCartItem } from '../../../../slices/Cart/interfaces';
import { ProductImage, Wrapper } from './styles';

interface IProps {
    cartItem: IExtendedCartItem;
}

/**
 * Компонент для отображения товара в корзине
 */
const CartItem: FC<IProps> = ({ cartItem }) => {
    const image =
        cartItem.product.product_image.find((element) => element.is_feature) || cartItem.product.product_image[0];

    return (
        <Wrapper>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                <div>
                    <Stack direction={'row'} spacing={2}>
                        <ProductImage src={image.image} alt={image.alt_text} />
                        <div>
                            <div>{cartItem.product.title}</div>
                            <div>{cartItem.product.regular_price}</div>
                        </div>
                    </Stack>
                </div>
                <div>{cartItem.product.regular_price * cartItem.quantity}</div>
            </Stack>
        </Wrapper>
    );
};

export default CartItem;
