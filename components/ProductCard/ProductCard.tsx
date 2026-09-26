import { PricingRow, NegotiablePriceWrapper } from './styles';
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
import { useSelector } from 'react-redux';
import { cartReducerValues } from '../../slices/Cart/cart';
import QuantityInput from '../QuantityInput/QuantityInput';
import useFetchData from './hooks/useFetchData';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {
    googleAnalytics4DataLayers,
    sendNewDataLayer,
} from '../../services/GoogleAnalytics4Service/GoogleAnalytics4Service';
import NegotiablePrice from '../NegotiablePrice/NegotiablePrice';
import { useTranslation } from 'react-i18next';
import { IProductImage } from '../../models/Product';
import { formatProductPrice } from '../../tools/productPrice';
import { IProduct } from '../../models/Product';

/**
 * Компонент для отображения карточки продукта
 */
const ProductCard: FC<IProps> = ({ product, imageHeight }) => {
    const { cartItems } = useSelector(cartReducerValues);
    const { addCartItem } = useFetchData();
    const { t } = useTranslation();
    const router = useRouter();
    const cartProduct: IProduct = { ...product, external_ids: 'external_ids' in product ? product.external_ids : [] };

    const onProductAdd = () => {
        sendNewDataLayer(googleAnalytics4DataLayers.generateAddToCart(cartProduct));
        addCartItem(cartProduct);
    };

    const onProductClick = () => {
        sendNewDataLayer(googleAnalytics4DataLayers.generateSelectItem(cartProduct));
    };

    const productHref = {
        pathname: `/catalog/${product.id}`,
        query: router.pathname === '/catalog' ? { from: router.asPath } : {},
    };

    const cartItem = useMemo(() => {
        return cartItems.find((element) => element.product.id === product.id);
    }, [cartItems, product]);

    const mainImage = useMemo(() => {
        return product.product_image?.find((image) => image.is_feature) || product.product_image?.[0];
    }, [product]) as IProductImage | undefined;

    return (
        <Wrapper>
            <Link href={productHref} passHref>
                <ImageWrapper
                    height={imageHeight}
                    onClick={onProductClick}
                    aria-label={`Подробнее о товаре ${product.title}`}
                >
                    {mainImage?.image ? (
                        <Image
                            src={mainImage.image}
                            alt={mainImage.alt_text || product.title}
                            layout={'fill'}
                            objectFit={'contain'}
                        />
                    ) : (
                        <span>Фото скоро появится</span>
                    )}
                </ImageWrapper>
            </Link>
            <ContentWrapper>
                <Link href={productHref} passHref>
                    <Title onClick={onProductClick}>{product.title}</Title>
                </Link>

                <PricingRow data-popular-product-pricing direction={'row'}>
                    {product.is_negotiable_price ? (
                        <NegotiablePriceWrapper>
                            <NegotiablePrice />
                        </NegotiablePriceWrapper>
                    ) : (
                        <>
                            <Price data-popular-product-price>{formatProductPrice(product)}</Price>
                            <UnitWrapper data-popular-product-unit>за 1 {t(product.unit)}</UnitWrapper>
                        </>
                    )}
                </PricingRow>
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
