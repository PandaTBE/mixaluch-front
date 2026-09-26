import { AccountHeading, AccountDataValue, SkeletonNavItem } from './styles';
import { ReactNode } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
    AccordionNavigationWrapper,
    AccordionTitle,
    NavigationWrapper,
    Section,
    Wrapper,
} from '../../../../layouts/UserAccountSidebarLayout/styles';
import { Aside } from '../../../../layouts/UserAccountSidebarLayout/components/Navigation/styles';
import { ContentWrapper, UserData } from '../../../pages/UserAccountPage/styles';
import PageTitle from '../../../PageTitle/PageTitle';

export const AccountSkeletonLayout = ({ children }: { children: ReactNode }) => (
    <Wrapper aria-hidden="true">
        <AccordionNavigationWrapper>
            <AccountHeading>
                <AccordionTitle>Личный кабинет</AccordionTitle>
            </AccountHeading>
        </AccordionNavigationWrapper>
        <NavigationWrapper>
            <Aside>
                {['Контактные данные', 'История заказов', 'Выход'].map((label) => (
                    <SkeletonNavItem key={label}>{label}</SkeletonNavItem>
                ))}
            </Aside>
        </NavigationWrapper>
        <Section>{children}</Section>
    </Wrapper>
);

export const AccountDataSkeleton = () => (
    <div aria-hidden="true">
        {['Имя:', 'Телефон:', 'Email:'].map((label) => (
            <UserData key={label}>
                <span>{label}</span>
                <AccountDataValue>
                    <Skeleton width="65%" />
                </AccountDataValue>
            </UserData>
        ))}
    </div>
);

const UserAccountPageSkeleton = () => (
    <AccountSkeletonLayout>
        <div>
            <PageTitle text="Контактные данные" />
            <ContentWrapper>
                <AccountDataSkeleton />
            </ContentWrapper>
        </div>
    </AccountSkeletonLayout>
);

export default UserAccountPageSkeleton;
