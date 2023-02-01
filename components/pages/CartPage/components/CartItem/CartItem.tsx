import { Stack } from '@mui/material';
import { FC } from 'react';
import { IExtendedCartItem } from '../../../../../slices/Cart/interfaces';
import QuantityInput from '../../../../QuantityInput/QuantityInput';
import useFecthData from './hooks/useFetchData';
import {
    FooterQuantityInputWrapper,
    FooterWrapper,
    Price,
    ProductImage,
    ProductTitle,
    QuantityInputWrapper,
    StyledCloseIcon,
    TotalPrice,
    TotalPriceWrapper,
    Wrapper,
} from './styles';

interface IProps {
    /** Элемент коризны */
    cartItem: IExtendedCartItem;
}

/**
 * Компонент для отображения товара в корзине
 */
const CartItem: FC<IProps> = ({ cartItem }) => {
    const { deleteCartItem } = useFecthData();

    const onRemoveClick = () => {
        deleteCartItem(cartItem.product.id, cartItem.id);
    };

    const image =
        cartItem.product.product_image.find((element) => element.is_feature) || cartItem.product.product_image[0];

    return (
        <Wrapper>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                <div>
                    <Stack direction={'row'} spacing={2}>
                        <ProductImage src={image.image} alt={image.alt_text} />
                        <Stack
                            spacing={2}
                            direction={'column'}
                            justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
                        >
                            <ProductTitle>{cartItem.product.title}</ProductTitle>
                            <Price>{cartItem.product.regular_price} ₽</Price>
                            <QuantityInputWrapper>
                                <QuantityInput
                                    cartItemId={cartItem.id}
                                    productId={cartItem.product.id}
                                    defaultValue={cartItem.quantity}
                                />
                            </QuantityInputWrapper>
                        </Stack>
                    </Stack>
                </div>
                <Stack spacing={2} direction={'column'} justifyContent="space-between">
                    <StyledCloseIcon onClick={onRemoveClick} />
                    <TotalPriceWrapper>
                        <TotalPrice>{Math.floor(cartItem.product.regular_price * cartItem.quantity)} ₽</TotalPrice>
                    </TotalPriceWrapper>
                </Stack>
            </Stack>
            <FooterWrapper>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <FooterQuantityInputWrapper>
                        <QuantityInput
                            cartItemId={cartItem.id}
                            productId={cartItem.product.id}
                            defaultValue={cartItem.quantity}
                        />
                    </FooterQuantityInputWrapper>

                    <TotalPrice>{Math.floor(cartItem.product.regular_price * cartItem.quantity)} ₽</TotalPrice>
                </Stack>
            </FooterWrapper>
        </Wrapper>
    );
};

export default CartItem;
