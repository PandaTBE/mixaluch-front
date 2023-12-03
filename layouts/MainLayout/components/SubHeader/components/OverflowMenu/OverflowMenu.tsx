import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IconButton } from '@mui/material';
import { FC, useMemo } from 'react';
import {
    BodyWrapper,
    Delivery,
    HeaderWrapper,
    LogoWrapper,
    Nav,
    StyledDrawer,
    StyledLink,
    Telephone,
    Wrapper,
} from './styles';
import { navigationListItems } from '../../../constants/constants';
import { storePageToSwitch } from '../../../../../../slices/General/general';
import { TPageToSwitch } from '../../../../../../slices/General/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { cloneDeep } from 'lodash';
import { userReducerValues } from '../../../../../../slices/User/user';

interface IProps {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
}

/**
 * Компонент для отображения выезжающего меню
 */
const OverflowMenu: FC<IProps> = ({ isDrawerOpen, toggleDrawerOpen }) => {
    const store = useSelector(userReducerValues);
    const dispatch = useDispatch();
    const router = useRouter();

    const onLinkClick = (link: TPageToSwitch) => () => {
        dispatch(storePageToSwitch(link));
        toggleDrawerOpen();
    };

    const _navigationItems = useMemo(() => {
        const result = cloneDeep(navigationListItems);

        if (store.user?.is_staff && store.authToken) {
            result.push({
                id: 'admin',
                href: '/admin',
                name: 'Панель администратора',
                isActive: (pathname, href) => pathname.includes(href),
            });
        }
        return result;
    }, [store.user, store.authToken]);

    return (
        <StyledDrawer
            open={isDrawerOpen}
            onClose={toggleDrawerOpen}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <Wrapper>
                <HeaderWrapper>
                    <Link href={'/'}>
                        <LogoWrapper onClick={onLinkClick('/')}>
                            <Image src={'/static/logo.png'} alt={'Mixaluch logo'} layout={'fill'} />
                        </LogoWrapper>
                    </Link>
                    <IconButton color={'inherit'} onClick={toggleDrawerOpen}>
                        <ChevronLeftIcon />
                    </IconButton>
                </HeaderWrapper>
                <BodyWrapper>
                    <Nav>
                        {_navigationItems.map((element) => {
                            return (
                                <StyledLink
                                    key={element.id}
                                    onClick={onLinkClick(element.href as TPageToSwitch)}
                                    active={router.pathname === element.href}
                                >
                                    <Link href={element.href}>{element.name}</Link>
                                </StyledLink>
                            );
                        })}
                    </Nav>
                    <Delivery>Доставка с 9:00 до 19:00</Delivery>
                    <Telephone href="tel:+79269376840">+7 (926) 937-68-40</Telephone>
                    <Telephone href="tel:+79264013393">+7 (926) 401-33-93</Telephone>
                    <Telephone href="tel:+79775703378">+7 (977) 570-33-78</Telephone>
                </BodyWrapper>
            </Wrapper>
        </StyledDrawer>
    );
};

export default OverflowMenu;
