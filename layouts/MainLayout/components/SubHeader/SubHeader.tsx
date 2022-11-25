import { Stack, Tooltip } from '@mui/material';
import { CartIcon, LoginIcon, Logo, Wrapper } from './styles';

import Container from '../../../../components/Container/Container';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { userReducerValues } from '../../../../slices/User/user';
import { storePageToSwitch } from '../../../../slices/General/general';
import { TPageToSwitch } from '../../../../slices/General/interfaces';

/**
 * Компонент для отображения сабхеддера
 */
const SubHeader = () => {
    const { authToken } = useSelector(userReducerValues);
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
                        <Link href={authToken ? 'user-account' : '/login'}>
                            <Tooltip title={authToken ? 'Личный кабинет' : 'Вход'}>
                                <LoginIcon />
                            </Tooltip>
                        </Link>
                        <Link href={'/cart'}>
                            <Tooltip title={'Корзина'} onClick={onLinkClick('/cart')}>
                                <CartIcon />
                            </Tooltip>
                        </Link>
                    </Stack>
                </Stack>
            </Container>
        </Wrapper>
    );
};

export default SubHeader;
