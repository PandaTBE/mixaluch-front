import styled from 'styled-components';

export const Wrapper = styled.li`
    list-style: none;
    margin: 4px 0;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
    min-height: 48px;

    a {
        flex: 1;
        color: #333;
        text-decoration: none;
        padding: 12px 14px;
        border-radius: 10px;
        font-weight: 500;
        line-height: 1.4;
    }

    a:hover {
        background: #f6f5f3;
    }
    a[aria-current='page'] {
        color: ${(p) => p.theme.colors.primary};
        background: #fff1ef;
    }
    a:focus-visible {
        outline: 2px solid ${(p) => p.theme.colors.primary};
        outline-offset: -2px;
    }
`;

export const Toggle = styled.button`
    border: 0;
    background: transparent;
    color: #706b67;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    cursor: pointer;
    border-radius: 8px;
    &:hover,
    &:focus-visible {
        color: ${(p) => p.theme.colors.primary};
        background: #fff1ef;
    }
    &:focus-visible {
        outline: 2px solid ${(p) => p.theme.colors.primary};
        outline-offset: -2px;
    }
    svg {
        width: 20px;
        height: 20px;
    }
    &[aria-expanded='true'] svg {
        transform: rotate(180deg);
    }
`;

export const ChildList = styled.ul`
    padding: 0 0 0 8px;
    margin: 4px 0 8px 14px;
    border-left: 1px solid #e5ded8;
    ${Row} a {
        font-size: 14px;
        font-weight: 400;
    }
`;
