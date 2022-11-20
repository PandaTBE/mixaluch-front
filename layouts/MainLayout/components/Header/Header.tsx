import { ContentWrapper, Delivery, StyledLink, Telephone, Wrapper } from './styles';
import Container from '../../../../components/Container/Container';
import { Grid, Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { storePageToSwitch } from '../../../../slices/General/general';
import { TPageToSwitch } from '../../../../slices/General/interfaces';

/**
 * Компонент для отображения шапки страницы
 */
const Header = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const onLinkClick = (link: TPageToSwitch) => () => {
        dispatch(storePageToSwitch(link));
    };

    return (
        <Wrapper>
            <Container>
                <ContentWrapper>
                    <Grid container spacing={2} justifyContent="space-between">
                        <Grid item xs={3} sm={4} md={5} lg={7}>
                            <nav>
                                <Stack direction="row" spacing={2}>
                                    <StyledLink
                                        onClick={onLinkClick('/catalog')}
                                        active={router.pathname === '/catalog'}
                                    >
                                        <Link href={'/catalog'}>Каталог</Link>
                                    </StyledLink>

                                    <div>О компании</div>
                                </Stack>
                            </nav>
                        </Grid>
                        <Grid item xs={5} sm={4} md={4} lg={3}>
                            <Delivery>Доставка с 9:00 до 19:00</Delivery>
                        </Grid>
                        <Grid item xs={4} sm={4} md={3} lg={2} alignItems="flex-end">
                            <Telephone href="tel:+79269376840">+7 (926) 937-68-40</Telephone>
                        </Grid>
                    </Grid>
                </ContentWrapper>
            </Container>
        </Wrapper>
    );
};

export default Header;
