import { Paper, TableContainer, TableRow } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding-bottom: 56px;
`;

export const OrdersTableWrapper = styled.div`
    margin-top: 26px;
    overflow-x: auto;
`;

export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#faf9f7',
    },
}));

export const OrderNumber = styled.a`
    cursor: pointer;
    color: ${(p) => p.theme.colors.primary};
    text-decoration: underline;
`;

export const ErrorWrapper = styled.div``;

export const TablePanel = styled(Paper)`
    && {
        border: 1px solid #eceae7;
        border-radius: 16px;
        overflow: hidden;
    }
`;

export const StyledTableContainer = styled(TableContainer)`
    && {
        width: 100%;
    }
`;
