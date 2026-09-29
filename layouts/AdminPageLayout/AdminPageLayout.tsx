import { FC, PropsWithChildren, useEffect } from 'react';
import { ADMIN_TABS } from '../../constants/admin';
import { ContentWrapper, StyledTab, StyledTabs } from './styles';
import { useRouter } from 'next/router';

const AdminPageLayout: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const selectedTab = ADMIN_TABS.find((tab) => tab.href === router.pathname) || ADMIN_TABS[0];

    useEffect(() => {
        if (router.pathname === '/admin') void router.replace(ADMIN_TABS[0].href);
    }, [router]);

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        const currentTab = ADMIN_TABS.find((tab) => tab.id === newValue);
        if (currentTab) void router.push(currentTab.href);
    };

    return (
        <>
            <StyledTabs
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                value={selectedTab.id}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
            >
                {ADMIN_TABS.map((tab) => (
                    <StyledTab key={tab.id} value={tab.id} label={tab.text} disabled={Boolean(tab.disabled)} />
                ))}
            </StyledTabs>
            <ContentWrapper>{children}</ContentWrapper>
        </>
    );
};

export default AdminPageLayout;
