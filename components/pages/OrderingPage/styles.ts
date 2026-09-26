import styled from 'styled-components';
import { Alert, Stack } from '@mui/material';

export const BackLink = styled.a`
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    margin: 26px 0 12px;
    color: #746e68;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    &:hover {
        color: ${(p) => p.theme.colors.primary};
    }
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 28px 0 64px;
    gap: 28px;
    flex-grow: 1;
    @media (max-width: 767px) {
        flex-direction: column;
        padding: 20px 0 40px;
        gap: 16px;
    }
`;

export const WrapperItem = styled.div`
    flex: 1 1 0;
    min-width: 0;
    :first-child {
        flex-grow: 1.35;
    }
    :last-child {
        flex-grow: 0.85;
    }

    @media (max-width: 767px) {
        width: 100%;
    }
`;

export const AccordionWrapper = styled.div`
    display: none;
    @media (max-width: 767px) {
        display: block;
    }
`;

export const OrderWrapper = styled.div`
    display: block;
    position: sticky;
    top: 24px;
    @media (max-width: 767px) {
        display: none;
    }
`;

export const Total = styled.div`
    font-size: 20px;
`;

export const OrderHeading = styled.h2`
    margin: 0 0 12px;
    font-size: 20px;
    font-weight: 700;
`;

export const TotalValue = styled.div`
    font-size: 25px;
    font-weight: 700;
    margin-right: 10px;
`;

export const ErrorWrapper = styled.div`
    margin-top: 20px;
    width: 50%;

    @media (max-width: 991px) {
        width: 100%;
    }
`;

export const NoticeAlert = styled(Alert)`
    && {
        margin-top: 20px;
    }
`;

export const OrderSummaryRow = styled(Stack)`
    && {
        flex-grow: 1;
        align-items: center;
        justify-content: space-between;
    }
`;
