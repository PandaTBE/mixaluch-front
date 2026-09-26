import { Divider } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 24px;
    background: #f7f5f2;
    border: 1px solid #ebe7e3;
    border-radius: 18px;
    box-shadow: 0 8px 24px rgba(48, 45, 43, 0.04);

    @media (max-width: 767px) {
        padding: 18px;
    }
`;

export const StyledDivider = styled(Divider)`
    margin-top: 15px !important;
    margin-bottom: 15px !important;
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
