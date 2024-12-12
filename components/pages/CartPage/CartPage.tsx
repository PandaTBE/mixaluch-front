import { Alert, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    googleAnalytics4DataLayers,
    sendNewDataLayer,
} from '../../../services/GoogleAnalytics4Service/GoogleAnalytics4Service';
import { cartReducerValues } from '../../../slices/Cart/cart';
import { storePageToSwitch } from '../../../slices/General/general';
import Button from '../../Button/Button';
import PageTitle from '../../PageTitle/PageTitle';
import CartItem from './components/CartItem/CartItem';
import { ConfirmButtonWrapper, ContentWrapper, TotalValueTitle, TotalValueWrapper, Wrapper } from './styles';

/**
 * Компонент для отображения страницы корзины
 */
const CartPage = () => {
    const { cartItems, totalSum } = useSelector(cartReducerValues);
    const dispatch = useDispatch();
    const router = useRouter();

    /** Отправка события просмотра корзину в аналитику */
    useEffect(() => {
        sendNewDataLayer(googleAnalytics4DataLayers.generateViewCart(cartItems));
    }, [cartItems]);

    const onOrderClick = () => {
        dispatch(storePageToSwitch('/ordering'));
        router.push('/ordering');
    };

    const onCartItemTitleClick = (productId: number) => {
        dispatch(storePageToSwitch('/catalog/[id]'));
        router.push(`/catalog/${productId}`);
    };

    return (
        <Wrapper>
            <PageTitle text={'Корзина'} />
            <Alert style={{ marginTop: '15px' }} variant="outlined" severity="error">
                В связи с высокой нагруженностью в период с 13 декабря 2024 года по 5 января 2025 года заказы через сайт
                приниматься не будут. Благодарим за понимание и приносим извинения за временные неудобства!
            </Alert>
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
                                    <ConfirmButtonWrapper>
                                        <Button clickHandler={onOrderClick} disabled>
                                            <div>Оформить заказ</div>
                                        </Button>
                                    </ConfirmButtonWrapper>
                                </TotalValueWrapper>
                            </Grid>
                        </>
                    ) : (
                        <Grid item xs={12}>
                            Ваша корзина пуста
                        </Grid>
                    )}
                </Grid>
            </ContentWrapper>
        </Wrapper>
    );
};

export default CartPage;
