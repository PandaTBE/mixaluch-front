import styled from 'styled-components';
import { Stack } from '@mui/material';

export const ProductImageWrapper = styled.button`
    flex: 0 0 112px;
    height: 112px;
    position: relative;
    cursor: pointer;
    border: 0;
    background: #f6f5f3;
    border-radius: 12px;
    overflow: hidden;
    padding: 0;
    img {
        object-fit: contain;
    }

    @media (max-width: 599px) {
        flex: 0 0 76px;
        height: 76px;
    }
`;

export const Wrapper = styled.div`
    padding: 18px 0;
    border-bottom: 1px solid #eceae7;
    &:first-child {
        border-top: 1px solid #eceae7;
    }
`;

export const ItemMain = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 124px auto;
    align-items: center;
    gap: 24px;

    @media (max-width: 899px) {
        grid-template-columns: 112px 44px minmax(0, 1fr);
        gap: 12px 16px;

        > div:first-child {
            grid-column: 1 / -1;
        }
    }
`;

export const ItemDetails = styled.div`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const ProductTitle = styled.button`
    font-size: 1rem;
    font-weight: 650;
    cursor: pointer;
    padding: 0;
    border: 0;
    background: transparent;
    text-align: left;
    color: inherit;

    @media (max-width: 599px) {
        font-size: 1rem;
    }
`;

export const Price = styled.div`
    color: ${(p) => p.theme.colors.primary};
    font-size: 18px;
`;

export const QuantityInputWrapper = styled.div`
    width: 124px;
    @media (max-width: 899px) {
        grid-column: 1;
        width: 112px;
    }
`;

export const ItemActions = styled.div`
    min-width: 112px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;

    @media (max-width: 899px) {
        grid-column: 2 / -1;
        justify-content: flex-start;
        min-width: 0;
    }

    @media (max-width: 599px) {
        justify-content: flex-start;
    }
`;

export const ItemPrice = styled.div`
    min-width: 82px;
    text-align: right;
    @media (max-width: 899px) {
        margin-left: 92px;
        text-align: left;
    }

    @media (max-width: 599px) {
        display: none;
    }
`;

export const StyledCloseIcon = styled.button`
    color: #706b67;
    align-self: flex-end !important;
    cursor: pointer;
    background: transparent;
    border: 0;
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    &:hover {
        color: ${(p) => p.theme.colors.primary};
    }
`;

export const TotalPrice = styled.div`
    font-size: 1.125rem;
    font-weight: 600;
`;

export const UnitWrapper = styled.div`
    border-radius: 4px;
    background-color: #f6f5f7;
    padding: 6px 8px;
    white-space: nowrap;
`;

export const ProductSummary = styled(Stack)`
    && {
        min-width: 0;
        align-items: center;
    }
`;

export const UnitPriceRow = styled(Stack)`
    && {
        align-items: center;
        flex-wrap: wrap;
    }
`;
