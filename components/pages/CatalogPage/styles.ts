import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 28px 0 64px;
`;

export const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(190px, 230px) minmax(0, 1fr);
    align-items: start;
    gap: 30px;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
        gap: 20px;
    }
`;

export const Aside = styled.aside<{ $open: boolean }>`
    padding: 8px 0;

    h2 {
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #706b67;
        margin: 0 14px 18px;
    }
    nav > a {
        display: flex;
        align-items: center;
        min-height: 48px;
        color: #333;
        padding: 12px 14px;
        border-radius: 10px;
        text-decoration: none;
        font-weight: 500;
        margin-bottom: 8px;
    }
    nav > a:hover {
        background: #f6f5f3;
    }
    nav > a[aria-current='page'] {
        color: ${(p) => p.theme.colors.primary};
        background: #fff1ef;
    }
    nav :where(a, button):focus-visible {
        outline: 2px solid ${(p) => p.theme.colors.primary};
        outline-offset: -2px;
    }

    @media (max-width: 760px) {
        min-width: 0;
        padding: 0;
        border: 1px solid #e5ded8;
        border-radius: 14px;
        background: #fff;

        h2 {
            display: none;
        }
        nav {
            display: ${(p) => (p.$open ? 'block' : 'none')};
            border-top: 1px solid #ece8e4;
            margin: 0 12px;
            padding: 10px 0;
        }
    }
`;

export const CategoryTrigger = styled.button`
    display: none;

    @media (max-width: 760px) {
        display: flex;
        align-items: center;
        gap: 12px;
        width: 100%;
        min-height: 72px;
        padding: 12px 16px;
        border: 0;
        border-radius: 14px;
        background: transparent;
        color: #302d2b;
        font: inherit;
        text-align: left;
        cursor: pointer;

        > svg:first-child {
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            padding: 9px;
            border-radius: 10px;
            color: ${(p) => p.theme.colors.primary};
            background: #fff1ef;
        }
        > span {
            flex: 1;
            min-width: 0;
        }
        > span > span {
            display: block;
            margin-bottom: 3px;
            font-size: 12px;
            color: #706b67;
        }
        strong {
            display: block;
            font-size: 16px;
            font-weight: 500;
            line-height: 1.35;
            overflow-wrap: anywhere;
        }
        > svg:last-child {
            flex-shrink: 0;
            width: 22px;
            height: 22px;
            color: #706b67;
        }
        &[aria-expanded='true'] > svg:last-child {
            transform: rotate(180deg);
        }
        &:hover {
            background: #faf8f6;
        }
        &:focus-visible {
            outline: 2px solid ${(p) => p.theme.colors.primary};
            outline-offset: 3px;
        }
    }
`;

export const TreeList = styled.ul`
    margin: 0;
    padding: 0;
`;

export const Heading = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 22px;

    h1 {
        font-size: clamp(26px, 3vw, 36px);
        line-height: 1.15;
        margin: 0 0 6px;
    }
    p {
        color: #666;
        margin: 0;
    }
    .catalog-sort {
        min-width: 210px;
    }
    .catalog-sort .MuiOutlinedInput-root {
        min-height: 44px;
        border-radius: 10px;
        background: #fff;
        color: #302d2b;
        font: inherit;
    }
    .catalog-sort .MuiOutlinedInput-notchedOutline {
        border-color: #e5ded8;
    }
    .catalog-sort .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
        border-color: #b8afa8;
    }
    .catalog-sort .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${(p) => p.theme.colors.primary};
        border-width: 2px;
    }
    .catalog-sort .MuiInputLabel-root {
        color: #706b67;
    }
    .catalog-sort .MuiInputLabel-root.Mui-focused {
        color: ${(p) => p.theme.colors.primary};
    }
    .catalog-sort .MuiSelect-select {
        min-width: 190px;
        cursor: pointer;
    }
    @media (max-width: 520px) {
        width: 100%;
        .catalog-sort {
            width: min(100%, 280px);
            max-width: 250px;
        }
        .catalog-sort .MuiSelect-select {
            min-width: 0;
        }
    }
`;

export const CatalogGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;

    @media (max-width: 1150px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 430px) {
        gap: 10px;
    }
`;

export const EmptyState = styled.div`
    border: 1px solid #eee;
    border-radius: 12px;
    padding: 32px;
    background: #fff;
    h2 {
        margin-top: 0;
    }
    button,
    a {
        color: #da2519;
        background: transparent;
        border: 0;
        padding: 0;
        font: inherit;
        cursor: pointer;
    }
`;

export const LoadMore = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    min-height: 90px;
    flex-wrap: wrap;

    a,
    button {
        color: #da2519;
        background: transparent;
        border: 0;
        font: inherit;
        cursor: pointer;
    }
`;
