import { Stack } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';
import {
    googleAnalytics4DataLayers,
    sendNewDataLayer,
} from '../../../../../services/GoogleAnalytics4Service/GoogleAnalytics4Service';
import { IExtendedCartItem } from '../../../../../slices/Cart/interfaces';
import QuantityInput from '../../../../QuantityInput/QuantityInput';
import useFetchData from './hooks/useFetchData';
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
    UnitWrapper,
    Wrapper,
} from './styles';
import { useTranslation } from 'react-i18next';

interface IProps {
    /** Элемент корзины */
    cartItem: IExtendedCartItem;
    /** Обработчик нажатия на название товара */
    onCartItemTitleClick: (productId: number) => void;
}

/**
 * Компонент для отображения товара в корзине
 */
const CartItem: FC<IProps> = ({ cartItem, onCartItemTitleClick }) => {
    const { deleteCartItem } = useFetchData();

    const { t } = useTranslation();

    const onRemoveClick = () => {
        sendNewDataLayer(googleAnalytics4DataLayers.generateRemoveFromCart(cartItem));
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
                        <ProductImageWrapper onClick={onTitleClick}>
                            <Image layout="fill" src={image.image} alt={image.alt_text} />
                        </ProductImageWrapper>
                        <Stack
                            spacing={2}
                            direction={'column'}
                            justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
                        >
                            <ProductTitle onClick={onTitleClick}>{cartItem.product.title}</ProductTitle>
                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                <Price>{cartItem.product.regular_price} ₽</Price>
                                <UnitWrapper>за 1 {t(cartItem.product.unit)}</UnitWrapper>
                            </Stack>
                            <QuantityInputWrapper>
                                <QuantityInput
                                    minQuantityValue={cartItem.product.min_quantity}
                                    defaultValue={cartItem.quantity}
                                    productId={cartItem.product.id}
                                    unit={cartItem.product.unit}
                                    cartItemId={cartItem.id}
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
                            minQuantityValue={cartItem.product.min_quantity}
                            defaultValue={cartItem.quantity}
                            productId={cartItem.product.id}
                            unit={cartItem.product.unit}
                            cartItemId={cartItem.id}
                        />
                    </FooterQuantityInputWrapper>

                    <TotalPrice>{Math.floor(cartItem.product.regular_price * cartItem.quantity)} ₽</TotalPrice>
                </Stack>
            </FooterWrapper>
        </Wrapper>
    );
};

export default CartItem;
