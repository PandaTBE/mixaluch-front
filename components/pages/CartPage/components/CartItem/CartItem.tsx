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
import { IProductImage } from '../../../../../models/Product';
import { formatProductPrice } from '../../../../../tools/productPrice';
import NegotiablePrice from '../../../../NegotiablePrice/NegotiablePrice';

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
        cartItem.product.product_image.find((element) => element.is_feature) ||
        (cartItem.product.product_image[0] as IProductImage | undefined);

    const onTitleClick = () => {
        onCartItemTitleClick(cartItem.product.id);
    };

    return (
        <Wrapper>
            <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
                <div>
                    <Stack direction={'row'} spacing={2}>
                        <ProductImageWrapper onClick={onTitleClick}>
                            <Image layout="fill" src={image?.image || ''} alt={image?.alt_text} />
                        </ProductImageWrapper>
                        <Stack
                            spacing={2}
                            direction={'column'}
                            justifyContent={{ xs: 'flex-start', sm: 'space-between' }}
                        >
                            <ProductTitle onClick={onTitleClick}>{cartItem.product.title}</ProductTitle>
                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                {cartItem.product.is_negotiable_price ? (
                                    <NegotiablePrice />
                                ) : (
                                    <>
                                        <Price>{formatProductPrice(cartItem.product)}</Price>
                                        <UnitWrapper>за 1 {t(cartItem.product.unit)}</UnitWrapper>
                                    </>
                                )}
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
                    {!cartItem.product.is_negotiable_price && (
                        <TotalPriceWrapper>
                            <TotalPrice>{formatProductPrice(cartItem.product, cartItem.quantity)}</TotalPrice>
                        </TotalPriceWrapper>
                    )}
                </Stack>
            </Stack>
            <FooterWrapper>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} flexWrap="wrap" gap={1}>
                    <FooterQuantityInputWrapper>
                        <QuantityInput
                            minQuantityValue={cartItem.product.min_quantity}
                            defaultValue={cartItem.quantity}
                            productId={cartItem.product.id}
                            unit={cartItem.product.unit}
                            cartItemId={cartItem.id}
                        />
                    </FooterQuantityInputWrapper>

                    {!cartItem.product.is_negotiable_price && (
                        <TotalPrice>{formatProductPrice(cartItem.product, cartItem.quantity)}</TotalPrice>
                    )}
                </Stack>
            </FooterWrapper>
        </Wrapper>
    );
};

export default CartItem;
