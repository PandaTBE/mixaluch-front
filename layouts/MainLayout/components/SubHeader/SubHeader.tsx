import Container from '../../../../components/Container/Container';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import OverflowMenu from './components/OverflowMenu/OverflowMenu';
import { cartReducerValues } from '../../../../slices/Cart/cart';
import { IconButton, Stack } from '@mui/material';
import { storePageToSwitch } from '../../../../slices/General/general';
import { TPageToSwitch } from '../../../../slices/General/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { userReducerValues } from '../../../../slices/User/user';
import { useState } from 'react';
import {
    CartIcon,
    CartIconWrapper,
    CartWrapper,
    LoginIcon,
    LogoWrapper,
    MenuIconWrapper,
    TotalItems,
    TotalSum,
    Wrapper,
} from './styles';
import Image from 'next/image';

/**
 * Компонент для отображения сабхеддера
 */
const SubHeader = () => {
    const { authToken } = useSelector(userReducerValues);
    const { totalSum, cartItems } = useSelector(cartReducerValues);
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDrawerOpen = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    const onLinkClick = (link: TPageToSwitch) => () => {
        dispatch(storePageToSwitch(link));
    };

    return (
        <Wrapper>
            <Container>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                    <MenuIconWrapper>
                        <IconButton color="inherit" onClick={toggleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                    </MenuIconWrapper>

                    <Link rel="canonical" href={'/'}>
                        <LogoWrapper onClick={onLinkClick('/')}>
                            <Image src={'/static/logo.png'} alt={'Mixaluch logo'} layout={'fill'} />
                        </LogoWrapper>
                    </Link>

                    <Stack direction="row" spacing={2} alignItems="center">
                        <Link rel="canonical" href={authToken ? '/user-account' : '/login'}>
                            <LoginIcon onClick={onLinkClick('/user-account')} />
                        </Link>
                        <Link rel="canonical" href={'/cart'}>
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
            <OverflowMenu isDrawerOpen={isDrawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
        </Wrapper>
    );
};

export default SubHeader;
