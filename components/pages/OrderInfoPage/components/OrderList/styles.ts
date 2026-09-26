import { Paper, TableContainer, TableRow } from '@mui/material';
import styled from 'styled-components';

export const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#faf9f7',
    },
}));

export const Wrapper = styled.div`
    margin-top: 15px;
    overflow-x: auto;
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

export const TablePanel = styled(Paper)`
    > div > p {
        margin: 16px;
    }

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
