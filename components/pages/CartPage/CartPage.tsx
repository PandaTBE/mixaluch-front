import { Grid } from '@mui/material';
import { Stack } from '@mui/system';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    googleAnalytics4DataLayers,
    sendNewDataLayer,
} from '../../../services/GoogleAnalytics4Service/GoogleAnalytics4Service';
import { cartReducerValues } from '../../../slices/Cart/cart';
import Button from '../../Button/Button';
import PageTitle from '../../PageTitle/PageTitle';
import CartItem from './components/CartItem/CartItem';
import {
    BackLink,
    ConfirmButtonWrapper,
    ContentWrapper,
    EmptyCart,
    NegotiablePriceNotice,
    TotalValueTitle,
    TotalValueWrapper,
    Wrapper,
} from './styles';

/**
 * Компонент для отображения страницы корзины
 */
const CartPage = () => {
    const { cartItems, totalSum } = useSelector(cartReducerValues);
    const router = useRouter();

    /** Отправка события просмотра корзину в аналитику */
    useEffect(() => {
        sendNewDataLayer(googleAnalytics4DataLayers.generateViewCart(cartItems));
    }, [cartItems]);

    const onOrderClick = () => {
        router.push('/ordering');
    };

    const onCartItemTitleClick = (productId: number) => {
        router.push(`/catalog/${productId}`);
    };

    return (
        <Wrapper>
            <Link href="/catalog" passHref>
                <BackLink>← Продолжить покупки</BackLink>
            </Link>
            <PageTitle text={'Корзина'} />
            <ContentWrapper>
                <Grid container spacing={2}>
                    {cartItems.length ? (
                        <>
                            <Grid item xs={12} md={8} xl={9}>
                                <Stack direction="column" spacing={2}>
                                    {cloneDeep(cartItems)
                                        .sort((a, b) => (a.product.title < b.product.title ? -1 : 1))
                                        .map((element) => {
                                            return (
                                                <CartItem
                                                    onCartItemTitleClick={onCartItemTitleClick}
                                                    cartItem={element}
                                                    key={element.product.id}
                                                />
                                            );
                                        })}
                                </Stack>
                            </Grid>
                            <Grid item xs={12} md={4} xl={3}>
                                <TotalValueWrapper>
                                    <TotalValueTitle>
                                        <span>Итого к оплате: </span>
                                        <span>{Math.floor(totalSum)} ₽</span>
                                    </TotalValueTitle>
                                    {cartItems.some((item) => item.product.is_negotiable_price) && (
                                        <NegotiablePriceNotice variant="body2" color="text.secondary">
                                            Товары с договорной ценой не включены в итог. Их стоимость согласуется
                                            отдельно.
                                        </NegotiablePriceNotice>
                                    )}
                                    <ConfirmButtonWrapper>
                                        <Button clickHandler={onOrderClick}>
                                            <div>Оформить заказ</div>
                                        </Button>
                                    </ConfirmButtonWrapper>
                                </TotalValueWrapper>
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            <EmptyCart>
                                <h2>Ваша корзина пуста</h2>
                                <p>Выберите товары в каталоге, чтобы оформить заказ.</p>
                                <Link href="/catalog">Перейти в каталог →</Link>
                            </EmptyCart>
                        </Grid>
                    )}
                </Grid>
            </ContentWrapper>
        </Wrapper>
    );
};

export default CartPage;
