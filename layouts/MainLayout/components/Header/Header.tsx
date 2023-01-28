import { ContentWrapper, Delivery, Nav, StyledLink, Telephone, Wrapper } from './styles';
import Container from '../../../../components/Container/Container';
import { Grid } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { storePageToSwitch } from '../../../../slices/General/general';
import { TPageToSwitch } from '../../../../slices/General/interfaces';
import IntersectionObserverWrapper from './components/IntersectionObserverWrapper/IntersectionObserverWrapper';
import { navigationListItems } from '../constants/constants';

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
                    <Grid container spacing={2} alignItems={'center'}>
                        <Grid item xs={3} sm={6} md={7} lg={8}>
                            <Nav>
                                <IntersectionObserverWrapper>
                                    {
                                        navigationListItems.map((element) => {
                                            return (
                                                <StyledLink
                                                    key={element.id}
                                                    data-targetid={element.id}
                                                    onClick={onLinkClick(element.href as TPageToSwitch)}
                                                    active={router.pathname === element.href}
                                                >
                                                    <Link href={element.href}>{element.name}</Link>
                                                </StyledLink>
                                            );
                                        }) as JSX.Element[]
                                    }
                                </IntersectionObserverWrapper>
                            </Nav>
                        </Grid>
                        <Grid textAlign="right" item xs={5} sm={3} md={3} lg={2}>
                            <Delivery>Доставка с 9:00 до 19:00</Delivery>
                        </Grid>
                        <Grid textAlign="right" item xs={4} sm={3} md={2} lg={2}>
                            <Telephone href="tel:+79269376840">+7 (926) 937-68-40</Telephone>
                        </Grid>
                    </Grid>
                </ContentWrapper>
            </Container>
        </Wrapper>
    );
};

export default Header;
