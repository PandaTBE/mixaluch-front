import { Stack } from '@mui/material';
import { CartIcon, LoginIcon, Logo, TotalSum, Wrapper, CartWrapper, TotalItems, CartIconWrapper } from './styles';

import Container from '../../../../components/Container/Container';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { userReducerValues } from '../../../../slices/User/user';
import { storePageToSwitch } from '../../../../slices/General/general';
import { TPageToSwitch } from '../../../../slices/General/interfaces';
import { cartReducerValues } from '../../../../slices/Cart/cart';

/**
 * Компонент для отображения сабхеддера
 */
const SubHeader = () => {
    const { authToken } = useSelector(userReducerValues);
    const { totalSum, cartItems } = useSelector(cartReducerValues);
    const dispatch = useDispatch();

    const onLinkClick = (link: TPageToSwitch) => () => {
        dispatch(storePageToSwitch(link));
    };

    return (
        <Wrapper>
            <Container>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <Link href={'/'}>
                        <Logo onClick={onLinkClick('/')} src={'/logo.png'} alt={'Mixaluch logo'} />
                    </Link>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Link href={authToken ? '/user-account' : '/login'}>
                            <LoginIcon onClick={onLinkClick('/user-account')} />
                        </Link>
                        <Link href={'/cart'}>
                            <CartWrapper>
                                <Stack direction="row" spacing={1} alignItems="center" onClick={onLinkClick('/cart')}>
                                    <CartIconWrapper>
                                        <CartIcon />
                                        {cartItems.length ? <TotalItems>{cartItems.length}</TotalItems> : null}
                                    </CartIconWrapper>
                                    <TotalSum>{Math.floor(totalSum)} ₽</TotalSum>
                                </Stack>
                            </CartWrapper>
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </Wrapper>
    );
};

export default SubHeader;
