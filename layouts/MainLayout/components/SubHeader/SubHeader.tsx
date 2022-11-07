import { Grid, Tooltip } from '@mui/material';
import { LoginIcon, Logo, Wrapper } from './styles';

import Container from '../../../../components/Container/Container';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { userReducerValues } from '../../../../slices/User/user';

/**
 * Компонент для отображения сабхеддера
 */
const SubHeader = () => {
    const { authToken } = useSelector(userReducerValues);

    return (
        <Wrapper>
            <Container>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Link href={'/'}>
                            <Logo src={'/logo.png'} alt={'Mixaluch logo'} />
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href={authToken ? 'user-account' : '/login'}>
                            <Tooltip title={authToken ? 'Личный кабинет' : 'Вход'}>
                                <LoginIcon />
                            </Tooltip>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Wrapper>
    );
};

export default SubHeader;
