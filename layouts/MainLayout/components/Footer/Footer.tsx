import { Stack } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from '../../../../components/Container/Container';
import { storePageToSwitch } from '../../../../slices/General/general';
import { TPageToSwitch } from '../../../../slices/General/interfaces';
import { navigationListItems } from '../constants/constants';
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
    const [lastOrderClicked, setLastOrderClicked] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const onLinkClick = (link: TPageToSwitch) => () => {
        dispatch(storePageToSwitch(link));
    };

    const toggleLastOrderCLicked = () => {
        setLastOrderClicked((prevState) => !prevState);
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
                            <Image src={'/static/logo.png'} alt={'Mixaluch logo'} layout={'fill'} />
                        </Link>
                    </LogoWrapper>
                </ContentWrapper>
            </Container>
            <LastOrderWrapper clicked={lastOrderClicked} onClick={toggleLastOrderCLicked}>
                {lastOrderClicked && <LastOrderText>Ваш заказ</LastOrderText>}
                <StyledLocalMallOutlinedIcon />
            </LastOrderWrapper>
        </Wrapper>
    );
};

export default Footer;
