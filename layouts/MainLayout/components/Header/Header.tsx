import Container from '../../../../components/Container/Container';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { userReducerValues } from '../../../../slices/User/user';
import { navigationListItems } from '../constants/constants';
import { ContentWrapper, Delivery, Nav, StyledLink, Telephone, Wrapper } from './styles';

const Header = () => {
    const { authToken, user } = useSelector(userReducerValues);
    const router = useRouter();
    const items =
        authToken && user?.is_staff
            ? [
                  ...navigationListItems,
                  {
                      id: 'admin',
                      href: '/admin',
                      name: 'Админка',
                      isActive: (pathname: string) => pathname.startsWith('/admin'),
                  },
              ]
            : navigationListItems;

    return (
        <Wrapper>
            <Container>
                <ContentWrapper>
                    <Nav aria-label="Основная навигация">
                        <StyledLink active={router.pathname === '/'}>
                            <Link href="/">Главная</Link>
                        </StyledLink>
                        {items.map((item) => (
                            <StyledLink key={item.id} active={item.isActive(router.pathname, item.href)}>
                                <Link href={item.href}>{item.name}</Link>
                            </StyledLink>
                        ))}
                    </Nav>
                    <Delivery>Доставка с 9:00 до 19:00</Delivery>
                    <Telephone href="tel:+79250001660">+7 (925) 000-16-60</Telephone>
                </ContentWrapper>
            </Container>
        </Wrapper>
    );
};

export default Header;
