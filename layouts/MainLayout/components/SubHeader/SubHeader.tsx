import { Grid, Tooltip } from '@mui/material';
import Link from 'next/link';
import Container from '../../../../components/Container/Container';
import { Logo, Wrapper } from './styles';
import SupervisedUserCircle from '@mui/icons-material/SupervisedUserCircle';

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
                                <SupervisedUserCircle />
                            </Tooltip>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </Wrapper>
    );
};

export default SubHeader;
