import { Stack } from '@mui/system';
import { useSelector } from 'react-redux';
import { cartReducerValues } from '../../slices/Cart/cart';
import PageTitle from '../PageTitle/PageTitle';
import CartItem from './components/CartItem/CartItem';
import { ContentWrapper } from './styles';

/**
 * Компонент для отображения страницы корзины
 */
const CartPage = () => {
    const { cartItems } = useSelector(cartReducerValues);
    return (
        <div>
            <PageTitle>
                <div>Корзина</div>
            </PageTitle>
            <ContentWrapper>
                {!cartItems.length && <div>Ваша корзина пуста</div>}
                {cartItems.length ? (
                    <Stack direction="column" gap={10}>
                        {cartItems.map((element) => {
                            return <CartItem cartItem={element} key={element.product.id} />;
                        })}
                    </Stack>
                ) : null}
            </ContentWrapper>
        </div>
    );
};

export default CartPage;
