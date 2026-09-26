import styled from 'styled-components';
import { Typography } from '@mui/material';

export const Wrapper = styled.div`
    padding: 24px 0 56px;
`;

export const BackLink = styled.a`
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    margin-bottom: 8px;
    color: #706b67;
    font-size: 13px;
    text-decoration: none;
    &:hover {
        color: ${(p) => p.theme.colors.primary};
    }
`;

export const ContentWrapper = styled.div`
    margin-top: 26px;

    @media (max-width: 575px) {
        margin-top: 20px;
    }
`;

export const CartItemsWrapper = styled.div`
    width: 100%;
`;

export const TotalValueWrapper = styled.div`
    background-color: #f6f5f3;
    border-radius: 18px;
    padding: 25px;
    position: sticky;
    top: calc(var(--header-height) + 25px);
`;

export const TotalValueTitle = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
    font-weight: bold;
    flex-wrap: wrap;
    column-gap: 10px;
    span {
        margin-right: 5px;
        :last-child {
            margin-right: 0px;
        }
    }
`;

export const ConfirmButtonWrapper = styled.div`
    margin-top: 24px;
    button {
        min-height: 48px;
        border-radius: 12px;
        font-weight: 650;
    }
`;

export const EmptyCart = styled.div`
    text-align: center;
    padding: 65px 20px 95px;
    h2 {
        font-size: 29px;
        margin: 0;
    }
    p {
        color: #706b67;
        margin: 14px 0 24px;
    }
    a {
        color: ${(p) => p.theme.colors.primary};
        font-weight: 650;
    }
`;

export const NegotiablePriceNotice = styled(Typography)`
    && {
        margin-top: 16px;
    }
`;
