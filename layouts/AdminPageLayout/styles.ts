import { Tab, Tabs } from '@mui/material';
import styled from 'styled-components';

export const StyledTab = styled(Tab)`
    text-transform: capitalize !important;
    color: ${(p) => p.theme.colors.black} !important;
    &.Mui-selected {
        color: ${(p) => p.theme.colors.primary} !important;
    }
    &.Mui-disabled {
        cursor: not-allowed !important;
        color: ${(p) => p.theme.colors.grey} !important;
        pointer-events: all !important;
    }
`;

export const StyledTabs = styled(Tabs)`
    .MuiTabs-indicator {
        background-color: ${(p) => p.theme.colors.primary};
    }
`;

export const ContentWrapper = styled.div`
    margin-top: 20px;
`;
