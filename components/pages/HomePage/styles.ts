import styled from 'styled-components';
import Link from '@mui/material/Link';

export const NavigationLink = styled(Link).attrs({ underline: 'none', color: 'inherit' })`
    && {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 44px;
        color: #49382d;
        font: inherit;
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
        text-decoration: none;
    }
    svg {
        font-size: 18px;
        flex-shrink: 0;
    }
    &&:hover {
        color: ${(p) => p.theme.colors.primary};
        text-decoration: underline;
    }
    &&:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 4px;
        border-radius: 4px;
    }
`;

export const Intro = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin: 24px 0;
    @media (max-width: 650px) {
        align-items: flex-start;
        flex-direction: column;
        margin: 18px 0;
        gap: 4px;
    }
`;

export const PageHeading = styled.h1`
    margin: 0;
    color: #292522;
    font-size: clamp(23px, 3vw, 36px);
    line-height: 1.16;
    letter-spacing: -0.035em;
`;

export const SectionHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
    h2 {
        margin: 0;
        font-size: clamp(24px, 3vw, 30px);
        letter-spacing: -0.025em;
    }
    @media (max-width: 450px) {
        align-items: flex-start;
        flex-direction: column;
        gap: 4px;
    }
`;

export const Editorial = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
    border-radius: 22px;
    background: #f1e7db;
    margin: 8px 0 28px;
    @media (max-width: 650px) {
        grid-template-columns: 1fr;
    }
`;

export const EditorialCopy = styled.div`
    padding: clamp(24px, 3.5vw, 44px);
    color: #49382d;
    > span {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.07em;
        text-transform: uppercase;
    }
    h2 {
        font-size: clamp(25px, 3vw, 36px);
        line-height: 1.15;
        letter-spacing: -0.035em;
        margin: 16px 0 12px;
    }
    p {
        font-size: 14px;
        line-height: 1.6;
        max-width: 390px;
        margin: 0 0 24px;
    }
    > a {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: 10px;
        padding: 12px 16px;
        background: #49382d;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
        text-decoration: none;
    }
    > a svg {
        font-size: 18px;
    }
    > a:hover {
        background: #30241e;
    }
    > a:focus-visible {
        outline: 2px solid #49382d;
        outline-offset: 4px;
    }
`;

export const EditorialImage = styled.div`
    position: relative;
    min-height: 280px;
    @media (max-width: 650px) {
        min-height: 200px;
    }
`;

export const StoreNote = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 0 0 28px;
    border-bottom: 1px solid #eae6e1;
    margin-bottom: 32px;
    p {
        flex: 1;
        margin: 0;
        font-size: 14px;
        line-height: 1.6;
        color: #766e66;
    }
    strong {
        color: #292522;
    }
    @media (max-width: 900px) {
        flex-wrap: wrap;
        gap: 8px 24px;
        p {
            flex-basis: 100%;
        }
    }
`;
