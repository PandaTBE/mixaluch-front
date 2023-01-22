import { Divider } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 15px 0;
`;

export const StyledDivider = styled(Divider)`
    margin-top: 15px;
    margin-bottom: 15px;
`;

export const SubtotalWrapper = styled.div`
    margin-top: 10px;
    :first-child {
        margin-top: 0px;
    }
`;

export const Subtotal = styled.div``;

export const SubtotalValue = styled.div`
    font-size: 20px;
    font-weight: 700;
`;

export const Total = styled.div`
    font-size: 20px;
`;

export const TotalValue = styled.div`
    font-size: 25px;
    font-weight: 700;
`;
