import styled from 'styled-components';
import { Alert, Stack } from '@mui/material';
import { CheckboxWrapper } from '../../../pages/OrderingPage/components/Delivery/styles';
import { ProductTitle } from '../../../pages/OrderingPage/components/Order/components/OrderItem/styles';

export const DeliveryAlert = styled(Alert)`
    && {
        margin-top: 15px;
    }
`;

export const SkeletonCheckboxWrapper = styled(CheckboxWrapper)`
    cursor: default;
`;

export const CheckboxPlaceholder = styled.span`
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    padding: 9px;
`;

export const OrderHeading = styled(Stack)`
    && {
        align-items: center;
        justify-content: space-between;
        min-height: 54px;
        padding-left: 16px;
        padding-right: 16px;
        box-shadow: 0 2px 4px #0003;
    }
`;

export const ProductTitlePlaceholder = styled(ProductTitle)`
    position: relative;
    color: transparent;
`;

export const PricePlaceholder = styled.div`
    flex-shrink: 0;
`;

export const CheckboxContent = styled(Stack)`
    && {
        align-items: center;
    }
`;

export const SummaryRow = styled(Stack)`
    && {
        justify-content: space-between;
    }
`;

export const OrderItemRow = styled(SummaryRow)`
    && {
        align-items: center;
    }
`;

export const OrderItemDetails = styled(Stack)`
    && {
        align-items: flex-start;
        @media (min-width: 600px) {
            align-items: center;
        }
    }
`;
