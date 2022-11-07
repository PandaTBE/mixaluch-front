import { Aside, NavItem, Section, Wrapper } from './styles';

import { FC } from 'react';
import Link from 'next/link';
import { Stack } from '@mui/material';

interface IProps {
    /** контент, который нужно отобразить внутри макета */
    children: JSX.Element;
}

/**
 * Компонент для отображения бокового меню пользваотеля
 */
const UserAccountSidebarLayout: FC<IProps> = ({ children }) => {
    return (
        <Wrapper>
            <Aside>
                <nav>
                    <Link href="/user-account">
                        <NavItem>Контактные данные</NavItem>
                    </Link>
                    <Link href="/user-account">
                        <NavItem>История заказов</NavItem>
                    </Link>
                    <Link href="/user-account">
                        <NavItem>Адрес доставки</NavItem>
                    </Link>
                    <Link href="/user-account">
                        <NavItem>Выход</NavItem>
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
