import styled from 'styled-components';

export const Wrapper = styled.a`
    overflow: hidden;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    color: #292522;
    background: #f5f1ec;
    text-decoration: none;
    &:nth-child(3n + 2) {
        background: #eef1e8;
    }
    &:nth-child(3n) {
        background: #f4ebe4;
    }
    &:hover {
        color: ${(p) => p.theme.colors.primary};
    }
    &:focus-visible {
        outline: 2px solid ${(p) => p.theme.colors.primary};
        outline-offset: 3px;
    }
`;

export const CategoryImageWrapper = styled.div`
    width: 100%;
    aspect-ratio: 1.6;
    overflow: hidden;
    position: relative;
`;

export const NameWrapper = styled.div`
    padding: 12px 14px 14px;
    font-weight: 600;
    font-size: 15px;
    line-height: 1.25;
    @media (max-width: 450px) {
        font-size: 14px;
        padding: 10px;
    }
`;
