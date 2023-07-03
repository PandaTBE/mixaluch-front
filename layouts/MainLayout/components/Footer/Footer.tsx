import Container from '../../../../components/Container/Container';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';
import { navigationListItems } from '../constants/constants';
import { orderReducerValues } from '../../../../slices/Order/order';
import { Stack } from '@mui/material';
import { storePageToSwitch } from '../../../../slices/General/general';
import { TPageToSwitch } from '../../../../slices/General/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
    ContentWrapper,
    StyledLink,
    Wrapper,
    Delivery,
    LogoWrapper,
    LastOrderWrapper,
    StyledLocalMallOutlinedIcon,
    LastOrderText,
} from './styles';

/**
 * Компонент для отображения подвала страницы
 */
const Footer = () => {
    const { lastOrderId } = useSelector(orderReducerValues);
    const [lastOrderClicked, setLastOrderClicked] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const urlsForHideLastOrder = ['/ordering', '/orders/[id]'];

    const onLinkClick = (link: TPageToSwitch) => () => {
        dispatch(storePageToSwitch(link));
    };

    const toggleLastOrderCLicked = () => {
        setLastOrderClicked((prevState) => !prevState);
    };

    const redirectToLastOrder = (e: MouseEvent) => {
        e.stopPropagation();
        lastOrderId && router.push(`/orders/${lastOrderId}`);
    };

    return (
        <Wrapper>
            <Container>
                <ContentWrapper>
                    <Stack direction={'row'} gap={2} flexWrap={'wrap'} justifyContent={'center'} alignItems={'center'}>
                        {navigationListItems.map((element) => {
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
                        })}
                    </Stack>
                    <Delivery>Доставка с 9:00 до 19:00</Delivery>
                    <LogoWrapper onClick={onLinkClick('/')}>
                        <Link href={'/'}>
                            <div>
                                <Image src={'/static/logo.png'} alt={'Mixaluch logo'} layout={'fill'} />
                            </div>
                        </Link>
                    </LogoWrapper>
                </ContentWrapper>
            </Container>
            {lastOrderId && !urlsForHideLastOrder.includes(router.pathname) && (
                <LastOrderWrapper clicked={lastOrderClicked} onClick={toggleLastOrderCLicked}>
                    {lastOrderClicked && <LastOrderText onClick={redirectToLastOrder}>Ваш заказ</LastOrderText>}
                    <StyledLocalMallOutlinedIcon />
                </LastOrderWrapper>
            )}
        </Wrapper>
    );
};

export default Footer;
