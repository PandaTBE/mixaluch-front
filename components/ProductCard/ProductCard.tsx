import {
    ButtonContentWrapper,
    ButtonText,
    ButtonWrapper,
    ContentWrapper,
    ImageWrapper,
    Price,
    Title,
    UnitWrapper,
    Wrapper,
} from './styles';

import Button from '../Button/Button';
import { FC, useMemo } from 'react';
import { IProps } from './interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { cartReducerValues } from '../../slices/Cart/cart';
import QuantityInput from '../QuantityInput/QuantityInput';
import useFetchData from './hooks/useFetchData';
import { useRouter } from 'next/router';
import { storePageToSwitch } from '../../slices/General/general';
import Image from 'next/image';
import {
    googleAnalytics4DataLayers,
    sendNewDataLayer,
} from '../../services/GoogleAnalytics4Service/GoogleAnalytics4Service';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IProductImage } from '../../models/Product';

/**
 * Компонент для отображения карточки продукта
 */
const ProductCard: FC<IProps> = ({ product, imageHeight }) => {
    const { cartItems } = useSelector(cartReducerValues);
    const { addCartItem } = useFetchData();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const router = useRouter();

    const onProductAdd = () => {
        sendNewDataLayer(googleAnalytics4DataLayers.generateAddToCart(product));
        addCartItem(product);
    };

    const onProductClick = () => {
        sendNewDataLayer(googleAnalytics4DataLayers.generateSelectItem(product));
        dispatch(storePageToSwitch('/catalog/[id]'));
        router.push(`/catalog/${product.id}`);
    };

    const cartItem = useMemo(() => {
        return cartItems.find((element) => element.product.id === product.id);
    }, [cartItems, product]);

    const mainImage = useMemo(() => {
        return product.product_image.find((image) => image.is_feature) || product.product_image[0];
    }, [product]) as IProductImage | undefined;

    return (
        <Wrapper>
            <ImageWrapper height={imageHeight} onClick={onProductClick}>
                <Image src={mainImage?.image || ''} alt={mainImage?.alt_text} layout={'fill'} objectFit={'contain'} />
            </ImageWrapper>
            <ContentWrapper>
                <Title onClick={onProductClick}>{product.title}</Title>

                <Stack flexWrap={'wrap'} gap={'10px'} direction={'row'} alignItems={'end'}>
                    <Price>{product.regular_price} ₽</Price>
                    <UnitWrapper>за 1 {t(product.unit)}</UnitWrapper>
                </Stack>
                <ButtonWrapper>
                    {cartItem ? (
                        <QuantityInput
                            minQuantityValue={product.min_quantity}
                            defaultValue={cartItem.quantity}
                            cartItemId={cartItem.id}
                            productId={product.id}
                            unit={product.unit}
                        />
                    ) : (
                        <Button width={'100%'} clickHandler={onProductAdd}>
                            <ButtonContentWrapper>
                                <ButtonText>В корзину</ButtonText>
                            </ButtonContentWrapper>
                        </Button>
                    )}
                </ButtonWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default ProductCard;
