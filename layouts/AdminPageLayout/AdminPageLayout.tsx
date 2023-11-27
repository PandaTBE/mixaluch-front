import { FC, PropsWithChildren, useEffect } from 'react';
import { ADMIN_TABS } from '../../constants/admin';
import { ContentWrapper, StyledTab, StyledTabs } from './styles';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { adminReducerValues, storeSelectedTab } from '../../slices/Admin/admin';

const AdminPageLayout: FC<PropsWithChildren> = ({ children }) => {
    const { selectedTab } = useSelector(adminReducerValues);

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        router.push(selectedTab.href);
    }, [selectedTab]);

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        const currentTab = ADMIN_TABS.find((tab) => tab.id === newValue);
        dispatch(storeSelectedTab(currentTab || ADMIN_TABS[0]));
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
