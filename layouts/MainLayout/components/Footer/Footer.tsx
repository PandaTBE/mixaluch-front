import { FooterNavigation } from './styles';
import Container from '../../../../components/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import { navigationListItems } from '../constants/constants';
import { orderReducerValues } from '../../../../slices/Order/order';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
    ContentWrapper,
    StyledLink,
    Wrapper,
    Delivery,
    LogoWrapper,
    LastOrderWrapper,
    StyledLocalMallOutlinedIcon,
} from './styles';

/**
 * Компонент для отображения подвала страницы
 */
const Footer = () => {
    const { lastOrderId } = useSelector(orderReducerValues);
    const router = useRouter();

    const urlsForHideLastOrder = ['/ordering', '/orders/[id]'];

    return (
        <Wrapper>
            <Container>
                <ContentWrapper>
                    <FooterNavigation direction={'row'}>
                        {navigationListItems.map((element) => {
                            return (
                                <StyledLink
                                    key={element.id}
                                    data-targetid={element.id}
                                    active={router.pathname === element.href}
                                >
                                    <Link href={element.href}>{element.name}</Link>
                                </StyledLink>
                            );
                        })}
                    </FooterNavigation>
                    <Delivery>Доставка с 9:00 до 19:00</Delivery>
                    <LogoWrapper>
                        <Link href={'/'}>
                            <div>
                                <Image src={'/static/logo.png'} alt={'Mixaluch logo'} layout={'fill'} />
                            </div>
                        </Link>
                    </LogoWrapper>
                </ContentWrapper>
            </Container>
            {lastOrderId && !urlsForHideLastOrder.includes(router.pathname) && (
                <LastOrderWrapper
                    type="button"
                    onClick={() => router.push(`/orders/${lastOrderId}`)}
                    aria-label={`Последний заказ №${lastOrderId}`}
                >
                    <span>Последний заказ</span>
                    <StyledLocalMallOutlinedIcon />
                </LastOrderWrapper>
            )}
        </Wrapper>
    );
};

export default Footer;
