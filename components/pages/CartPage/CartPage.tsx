import { Grid } from '@mui/material';
import { Stack } from '@mui/system';
import { cloneDeep } from 'lodash';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { cartReducerValues } from '../../../slices/Cart/cart';
import Button from '../../Button/Button';
import PageTitle from '../../PageTitle/PageTitle';
import CartItem from './components/CartItem/CartItem';
import { ConfirmButtonWrapper, ContentWrapper, TotalValueTitle, TotalValueWrapper, Wrapper } from './styles';

/**
 * Компонент для отображения страницы корзины
 */
const CartPage = () => {
    const { cartItems, totalSum } = useSelector(cartReducerValues);
    const router = useRouter();

    const onOrderClick = () => {
        router.push('/ordering');
    };

    return (
        <Wrapper>
            <PageTitle>
                <div>Корзина</div>
            </PageTitle>
            <ContentWrapper>
                <Grid container spacing={2}>
                    {cartItems.length ? (
                        <>
                            <Grid item xs={12} md={8} xl={9}>
                                <Stack direction="column" spacing={2}>
                                    {cloneDeep(cartItems)
                                        .sort((a, b) => (a.product.title < b.product.title ? -1 : 1))
                                        .map((element) => {
                                            return <CartItem cartItem={element} key={element.product.id} />;
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
                                        <Button clickHandler={onOrderClick}>
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
