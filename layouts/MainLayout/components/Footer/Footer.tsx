import { Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Container from '../../../../components/Container/Container';
import { storePageToSwitch } from '../../../../slices/General/general';
import { TPageToSwitch } from '../../../../slices/General/interfaces';
import { navigationListItems } from '../constants/constants';
import { ContentWrapper, StyledLink, Wrapper, Delivery, Logo } from './styles';

/**
 * Компонент для отображения подвала страницы
 */
const Footer = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const onLinkClick = (link: TPageToSwitch) => () => {
        dispatch(storePageToSwitch(link));
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
                    <Logo onClick={onLinkClick('/')} src={'/logo.png'} alt={'Mixaluch logo'} />
                </ContentWrapper>
            </Container>
        </Wrapper>
    );
};

export default Footer;
