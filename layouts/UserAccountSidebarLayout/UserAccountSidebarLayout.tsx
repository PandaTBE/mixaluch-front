import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navigation from './components/Navigation/Navigation';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { AccordionNavigationWrapper, AccordionTitle, NavigationWrapper, Section, Wrapper } from './styles';
import { FC, useEffect } from 'react';
import { resetUserReducer, userReducerValues } from '../../slices/User/user';
import { storeRawCartItems } from '../../slices/Cart/cart';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../../services/UserService';
import { useRouter } from 'next/router';
import { storePageToSwitch } from '../../slices/General/general';
import { TPageToSwitch } from '../../slices/General/interfaces';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../../constants/constants';

interface IProps {
    /** контент, который нужно отобразить внутри макета */
    children: JSX.Element;
}

/**
 * Компонент для отображения бокового меню пользваотеля
 */
const UserAccountSidebarLayout: FC<IProps> = ({ children }) => {
    const [logout, { isLoading }] = userApi.useLogoutMutation();
    const { authToken } = useSelector(userReducerValues);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (!authToken && !isLoading) {
            dispatch(storePageToSwitch('/user-account'));
            router.push('/login');
        }
    }, [authToken, isLoading]);

    const onLogoutClick = () => {
        if (authToken) {
            logout(authToken);
            localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, '');
            dispatch(resetUserReducer());
            dispatch(storeRawCartItems([]));
        }
    };

    const onLinkClick = (link: TPageToSwitch) => {
        router.push(link);
        dispatch(storePageToSwitch(link));
    };

    return (
        <Wrapper>
            <AccordionNavigationWrapper>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <AccordionTitle>Личный кабинет</AccordionTitle>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Navigation onLinkClick={onLinkClick} onLogoutClick={onLogoutClick} />
                    </AccordionDetails>
                </Accordion>
            </AccordionNavigationWrapper>
            <NavigationWrapper>
                <Navigation onLinkClick={onLinkClick} onLogoutClick={onLogoutClick} />
            </NavigationWrapper>
            <Section>{children}</Section>
        </Wrapper>
    );
};


export default UserAccountSidebarLayout
