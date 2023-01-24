import { TableRow } from '@mui/material';
import styled from 'styled-components';

export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f5f5f5',
    },
}));

export const Wrapper = styled.div`
    margin-top: 15px;
`;

export const FooterWrapper = styled.div`
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    span {
        font-weight: 700;
        margin-left: 10px;
    }
`;
