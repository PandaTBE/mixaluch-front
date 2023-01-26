import { Aside, NavItem, Section, Wrapper } from './styles';
import { FC, useEffect } from 'react';
import { resetUserReducer, userReducerValues } from '../../slices/User/user';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { userApi } from '../../services/UserService';
import { storeRawCartItems } from '../../slices/Cart/cart';

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
            router.push('/login');
        }
    }, [authToken]);

    const onLogoutClick = () => {
        if (authToken) {
            logout(authToken);
            localStorage.setItem('authToken', '');
            dispatch(resetUserReducer());
            dispatch(storeRawCartItems([]));
        }
    };

    return (
        <Wrapper>
            <Aside>
                <nav>
                    <Link href="/user-account">
                        <NavItem>Контактные данные</NavItem>
                    </Link>
                    <Link href="/orders">
                        <NavItem>История заказов</NavItem>
                    </Link>
                    <Link href="/">
                        <NavItem onClick={onLogoutClick}>Выход</NavItem>
                    </Link>
                </nav>
            </Aside>
            <Section>{children}</Section>
        </Wrapper>
    );
};

/** HOC для отображения компонент с макетом бокового меню */
export const withUserAccountSidebar = <T extends Record<string, unknown>>(Component: FC<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <UserAccountSidebarLayout>
                <Component {...props} />
            </UserAccountSidebarLayout>
        );
    };
};
