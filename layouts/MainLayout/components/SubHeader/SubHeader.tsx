import { Grid, Tooltip } from '@mui/material';
import Link from 'next/link';
import Container from '../../../../components/Container/Container';
import { LoginIcon, Logo, Wrapper } from './styles';
import Person from '@mui/icons-material/Person';

/**
 * Компонент для отображения сабхеддера
 */
const SubHeader = () => {
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
                        <Link href={'/login'}>
                            <Tooltip title="Вход">
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
