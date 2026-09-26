import { CardPriceRow, NegotiablePricePlaceholder, BlockSkeleton, CardImageContent, TextSkeleton } from './styles';
import Skeleton from 'react-loading-skeleton';
import { useTranslation } from 'react-i18next';
import type { IProps } from '../../ProductCard/interfaces';
import { formatProductPrice } from '../../../tools/productPrice';
import {
    ButtonWrapper,
    ContentWrapper,
    ImageWrapper,
    Price,
    Title,
    UnitWrapper,
    Wrapper,
} from '../../ProductCard/styles';

const ProductCardSkeleton = ({ imageHeight, product }: { imageHeight?: string; product?: IProps['product'] }) => {
    const { t } = useTranslation();
    return (
        <Wrapper aria-hidden="true">
            <ImageWrapper as="div" height={imageHeight} data-product-image>
                <CardImageContent>
                    <BlockSkeleton width="100%" height="100%" />
                </CardImageContent>
            </ImageWrapper>
            <ContentWrapper>
                <Title as="div">
                    {product ? <TextSkeleton>{product.title}</TextSkeleton> : <Skeleton count={2} width="90%" />}
                </Title>
                <CardPriceRow direction="row">
                    {product?.is_negotiable_price ? (
                        <NegotiablePricePlaceholder>
                            <Skeleton height={24} containerClassName="skeleton-block" />
                        </NegotiablePricePlaceholder>
                    ) : (
                        <>
                            <Price>
                                {product ? (
                                    <TextSkeleton>{formatProductPrice(product)}</TextSkeleton>
                                ) : (
                                    <Skeleton width={60} />
                                )}
                            </Price>
                            <UnitWrapper>
                                {product ? (
                                    <TextSkeleton>за 1 {t(product.unit)}</TextSkeleton>
                                ) : (
                                    <Skeleton width={30} />
                                )}
                            </UnitWrapper>
                        </>
                    )}
                </CardPriceRow>
                <ButtonWrapper>
                    <Skeleton height={40} containerClassName="skeleton-block" />
                </ButtonWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default ProductCardSkeleton;
