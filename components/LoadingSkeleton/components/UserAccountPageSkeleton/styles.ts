import styled from 'styled-components';
import { NavItem } from '../../../../layouts/UserAccountSidebarLayout/components/Navigation/styles';

export const AccountHeading = styled.div`
    min-height: 48px;
    padding: 12px 16px;
    box-shadow: 0 2px 4px #0003;
`;

export const SkeletonNavItem = styled(NavItem)`
    cursor: default;
    text-decoration: none;
`;

export const AccountDataValue = styled.div`
    flex: 1;
    min-width: 0;
`;
