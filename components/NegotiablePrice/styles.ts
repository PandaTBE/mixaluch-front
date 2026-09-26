import styled from 'styled-components';
import { IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const Label = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #666;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    white-space: nowrap;

    @media (max-width: 400px) {
        gap: 2px;
        font-size: 12px;
    }
`;

export const InfoButton = styled(IconButton)`
    && {
        color: inherit;
        padding: 4px;
    }
`;

export const InfoIcon = styled(InfoOutlinedIcon)`
    && {
        font-size: 16px;
    }
`;
