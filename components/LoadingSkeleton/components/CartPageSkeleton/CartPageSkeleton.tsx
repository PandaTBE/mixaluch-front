import {
    NegotiablePriceNote,
    ProductContent,
    SkeletonProductImage,
    SkeletonProductTitle,
    ProductTitlePlaceholder,
    RemoveButtonPlaceholder,
    RemoveIconSkeleton,
    TotalPlaceholder,
} from './styles';
import { SkeletonOverlay } from '../styles';
import { Grid, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { cartReducerValues } from '../../../../slices/Cart/cart';
import PageTitle from '../../../PageTitle/PageTitle';
import {
    BackLink,
    ConfirmButtonWrapper,
    ContentWrapper,
    TotalValueTitle,
    TotalValueWrapper,
    Wrapper,
} from '../../../pages/CartPage/styles';
import {
    ItemActions,
    ItemDetails,
    ItemMain,
    ItemPrice,
    QuantityInputWrapper,
    Wrapper as ItemWrapper,
} from '../../../pages/CartPage/components/CartItem/styles';

const CartPageSkeleton = () => {
    const { cartItems, totalSum } = useSelector(cartReducerValues);

    return (
        <Wrapper aria-hidden="true">
            <BackLink as="div">← Продолжить покупки</BackLink>
            <PageTitle text="Корзина" />
            <ContentWrapper>
                <Grid container spacing={2}>
                    {cartItems.length ? (
                        <>
                            <Grid item xs={12} md={8} xl={9}>
                                <Stack spacing={2}>
                                    {[...cartItems]
                                        .sort((a, b) => (a.product.title < b.product.title ? -1 : 1))
                                        .map(({ product }) => (
                                            <ItemWrapper key={product.id}>
                                                <ItemMain>
                                                    <ProductContent direction="row" spacing={2}>
                                                        <SkeletonProductImage as="div">
                                                            <Skeleton height="100%" />
                                                        </SkeletonProductImage>
                                                        <ItemDetails>
                                                            <SkeletonProductTitle as="div">
                                                                <ProductTitlePlaceholder>
                                                                    {product.title}
                                                                    <SkeletonOverlay>
                                                                        <Skeleton height="100%" />
                                                                    </SkeletonOverlay>
                                                                </ProductTitlePlaceholder>
                                                            </SkeletonProductTitle>
                                                            <Skeleton
                                                                height={24}
                                                                width="80%"
                                                                containerClassName="skeleton-block"
                                                            />
                                                        </ItemDetails>
                                                    </ProductContent>
                                                    <QuantityInputWrapper>
                                                        <Skeleton height={40} containerClassName="skeleton-block" />
                                                    </QuantityInputWrapper>
                                                    <ItemActions>
                                                        <RemoveButtonPlaceholder>
                                                            <RemoveIconSkeleton circle width={24} height={24} />
                                                        </RemoveButtonPlaceholder>
                                                        {!product.is_negotiable_price && (
                                                            <ItemPrice>
                                                                <Skeleton width={70} height={24} />
                                                            </ItemPrice>
                                                        )}
                                                    </ItemActions>
                                                </ItemMain>
                                            </ItemWrapper>
                                        ))}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4} xl={3}>
                                <TotalValueWrapper>
                                    <TotalValueTitle>
                                        <span>Итого к оплате: </span>
                                        <TotalPlaceholder>{Math.floor(totalSum)} ₽</TotalPlaceholder>
                                    </TotalValueTitle>
                                    {cartItems.some((item) => item.product.is_negotiable_price) && (
                                        <NegotiablePriceNote variant="body2">
                                            Товары с договорной ценой не включены в итог. Их стоимость согласуется
                                            отдельно.
                                        </NegotiablePriceNote>
                                    )}
                                    <ConfirmButtonWrapper>
                                        <Skeleton height={48} borderRadius={12} containerClassName="skeleton-block" />
                                    </ConfirmButtonWrapper>
                                </TotalValueWrapper>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={12} md={8} xl={9}>
                                <Stack spacing={2}>
                                    {[0, 1, 2].map((item) => (
                                        <Skeleton key={item} height={112} />
                                    ))}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4} xl={3}>
                                <Skeleton height={140} borderRadius={18} />
                            </Grid>
                        </>
                    )}
                </Grid>
            </ContentWrapper>
        </Wrapper>
    );
};

export default CartPageSkeleton;
