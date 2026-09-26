import styled from 'styled-components';
import { Paper, Stack, TableContainer } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

// Сохраняем переносы и высоту строк исходного текста на всех размерах экрана.
export const TextSkeleton = styled.span`
    color: transparent;
    background: #ebebeb;
    border-radius: 4px;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
`;

export const SkeletonOverlay = styled.span`
    position: absolute;
    inset: 0;
`;

export const SkeletonPaper = styled(Paper)`
    && {
        border: 1px solid #eceae7;
        border-radius: 16px;
        overflow: hidden;
    }
`;

export const SkeletonTableContainer = styled(TableContainer)`
    && {
        width: 100%;
    }
`;

export const CardImageContent = styled.div`
    width: 100%;
    height: 100%;
    line-height: 0;
`;

export const BlockSkeleton = styled(Skeleton)`
    display: block;
`;

export const AuthActions = styled(Stack)`
    && {
        flex-wrap: wrap;
        gap: 16px;
        align-items: center;
    }
`;

export const CardPriceRow = styled(Stack)`
    && {
        flex-wrap: wrap;
        gap: 10px;
        align-items: end;
    }
`;

export const NegotiablePricePlaceholder = styled(Stack)`
    && {
        margin-top: 10px;
        width: 100%;
    }
`;
