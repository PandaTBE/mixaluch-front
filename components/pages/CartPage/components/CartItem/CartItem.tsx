import { Stack } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import { IExtendedCartItem } from '../../../../../slices/Cart/interfaces';
import QuantityInput from '../../../../QuantityInput/QuantityInput';
import useFecthData from './hooks/useFetchData';
import {
    FooterQuantityInputWrapper,
    FooterWrapper,
    Price,
    ProductImageWrapper,
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
    /** Обработчик нажатия на название товара */
    onCartItemTitleClick: (productId: number) => void;
}

/**
 * Компонент для отображения товара в корзине
 */
const CartItem: FC<IProps> = ({ cartItem, onCartItemTitleClick }) => {
    const { deleteCartItem } = useFecthData();

    const onRemoveClick = () => {
        deleteCartItem(cartItem.product.id, cartItem.id);
    };

    const image =
        cartItem.product.product_image.find((element) => element.is_feature) || cartItem.product.product_image[0];

    const onTitleClick = () => {
        onCartItemTitleClick(cartItem.product.id);
    };

    return (
        <Wrapper>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                <div>
                    <Stack direction={'row'} spacing={2}>
                        <ProductImageWrapper>
                            <Image layout="fill" src={image.image} alt={image.alt_text} />
                        </ProductImageWrapper>
                        <Stack
                            spacing={2}
                            direction={'column'}
                            justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
                        >
                            <ProductTitle onClick={onTitleClick}>{cartItem.product.title}</ProductTitle>
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
