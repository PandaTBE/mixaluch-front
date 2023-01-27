import { TableRow } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding-bottom: 15px;
`;

export const OrdersTableWrapper = styled.div`
    margin-top: 15px;
`;

export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f5f5f5',
    },
}));

export const OrderNumber = styled.div`
    cursor: pointer;
    color: ${(p) => p.theme.colors.primary};
    text-decoration: underline;
`;

export const ErrorWrapper = styled.div``;
