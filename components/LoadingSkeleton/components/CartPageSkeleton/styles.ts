import styled from 'styled-components';
import { Stack, Typography } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { ProductImageWrapper, ProductTitle } from '../../../pages/CartPage/components/CartItem/styles';

export const ProductContent = styled(Stack)`
    && {
        min-width: 0;
        align-items: center;
    }
`;

export const SkeletonProductImage = styled(ProductImageWrapper)`
    cursor: default;
`;

export const SkeletonProductTitle = styled(ProductTitle)`
    cursor: default;
`;

export const ProductTitlePlaceholder = styled.span`
    position: relative;
    display: block;
    color: transparent;
`;

export const RemoveButtonPlaceholder = styled.div`
    width: 44px;
    height: 44px;
`;

export const RemoveIconSkeleton = styled(Skeleton)`
    margin: 10px;
`;

export const TotalPlaceholder = styled.span`
    color: transparent;
    background: #ebebeb;
    border-radius: 4px;
`;

export const NegotiablePriceNote = styled(Typography)`
    && {
        color: rgba(0, 0, 0, 0.6);
        margin-top: 16px;
    }
`;
