import { Stack } from '@mui/material';
import styled from 'styled-components';

export const OrderItemImageWrapper = styled.div`
    width: 60px;
    height: 60px;
    position: relative;
`;

export const QuantityWrapper = styled.div`
    flex-shrink: 0;
    span {
        font-size: 20px;
        font-weight: 700;
    }
`;

export const ProductTitle = styled.div``;

export const ItemRow = styled(Stack)`
    && {
        align-items: center;
        justify-content: space-between;
    }
`;

export const ProductDetails = styled(Stack)`
    && {
        align-items: flex-start;
        @media (min-width: 600px) {
            align-items: center;
        }
    }
`;

export const NegotiableQuantity = styled(Stack)`
    && {
        align-items: flex-end;
    }
`;
