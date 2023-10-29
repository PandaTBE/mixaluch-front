import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { ADMIN_TABS } from '../../constants/admin';
import { ContentWrapper, StyledTab, StyledTabs } from './styles';
import { useRouter } from 'next/router';

const AdminPageLayout: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const [value, setValue] = useState(router.asPath);

    useEffect(() => {
        router.push(value);
    }, [value]);

    useEffect(() => {
        setValue(router.pathname);
    }, []);

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <>
            <StyledTabs
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example"
            >
                {ADMIN_TABS.map((tab) => (
                    <StyledTab key={tab.id} value={tab.href} label={tab.text} disabled={Boolean(tab.disabled)} />
                ))}
            </StyledTabs>
            <ContentWrapper>{children}</ContentWrapper>
        </>
    );
};

export default AdminPageLayout;
