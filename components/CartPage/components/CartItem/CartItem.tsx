import { Stack } from '@mui/material';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCartItem } from '../../../../slices/Cart/cart';
import { IExtendedCartItem } from '../../../../slices/Cart/interfaces';
import QuantityInput from '../../../QuantityInput/QuantityInput';
import {
    Price,
    ProductImage,
    ProductTitle,
    QuantityInputWrapper,
    StyledCloseIcon,
    TotalPrice,
    Wrapper,
} from './styles';

interface IProps {
    cartItem: IExtendedCartItem;
}

/**
 * Компонент для отображения товара в корзине
 */
const CartItem: FC<IProps> = ({ cartItem }) => {
    const dispatch = useDispatch();

    const onRemoveClick = () => {
        dispatch(deleteCartItem(cartItem.product.id));
    };

    const image =
        cartItem.product.product_image.find((element) => element.is_feature) || cartItem.product.product_image[0];

    return (
        <Wrapper>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                <div>
                    <Stack direction={'row'} spacing={2}>
                        <ProductImage src={image.image} alt={image.alt_text} />
                        <Stack spacing={2} direction={'column'} justifyContent="space-between">
                            <ProductTitle>{cartItem.product.title}</ProductTitle>
                            <Price>{cartItem.product.regular_price} ₽</Price>
                            <QuantityInputWrapper>
                                <QuantityInput productId={cartItem.product.id} defaultValue={cartItem.quantity} />
                            </QuantityInputWrapper>
                        </Stack>
                    </Stack>
                </div>
                <Stack spacing={2} direction={'column'} justifyContent="space-between">
                    <StyledCloseIcon onClick={onRemoveClick} />
                    <TotalPrice>{Math.floor(cartItem.product.regular_price * cartItem.quantity)} ₽</TotalPrice>
                </Stack>
            </Stack>
        </Wrapper>
    );
};

export default CartItem;
