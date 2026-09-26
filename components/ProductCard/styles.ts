import { Stack } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
    border-radius: 18px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: #fff;
`;

export const ContentWrapper = styled.div`
    padding: 12px 4px 4px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export const Title = styled.a`
    display: inline-block;
    flex-grow: 1;
    color: inherit;
    text-decoration: none;
    line-height: 1.4;
    :hover {
        color: ${(p) => p.theme.colors.primary};
    }
    :focus-visible {
        outline: 2px solid ${(p) => p.theme.colors.primary};
        outline-offset: 3px;
    }
`;

export const Price = styled.div`
    margin-top: 10px;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
`;

export const ImageWrapper = styled.a<{ height?: string }>`
    width: 100%;
    height: ${(p) => p.height || '230px'};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f7f6f4;
    border-radius: 16px;
    overflow: hidden;
    color: #777;
    text-decoration: none;
    text-align: center;
    :focus-visible {
        outline: 2px solid ${(p) => p.theme.colors.primary};
        outline-offset: -2px;
    }
    @media (min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
        img {
            transition: transform 220ms ease-out;
        }
        &:hover img {
            transform: scale(1.04);
        }
    }
`;

export const ButtonWrapper = styled.div`
    margin-top: 10px;
`;

export const ButtonContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.div`
    color: #ffff;
    margin-right: 5px;
`;

export const UnitWrapper = styled.div`
    color: #777;
    font-size: 13px;
`;

export const PricingRow = styled(Stack)`
    && {
        flex-wrap: wrap;
        gap: 10px;
        align-items: end;
    }
`;

export const NegotiablePriceWrapper = styled(Stack)`
    && {
        margin-top: 10px;
    }
`;
