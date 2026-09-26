import styled from 'styled-components';

export const Wrapper = styled.div`
    border-top: 1px solid #eceae7;
    border-bottom: 1px solid #eceae7;
    background: white;
`;

export const ContentWrapper = styled.div`
    min-height: 48px;
    display: flex;
    align-items: center;
    gap: 22px;
`;

export const Nav = styled.nav`
    display: flex;
    gap: 24px;
    align-items: center;
    overflow-x: auto;
    white-space: nowrap;
    flex: 1;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const StyledLink = styled.div<{ active: boolean }>`
    color: ${(p) => (p.active ? p.theme.colors.primary : p.theme.colors.black)};
    font-size: 14px;
    font-weight: ${(p) => (p.active ? 700 : 500)};
    a {
        display: inline-flex;
        align-items: center;
        min-height: 44px;
    }
    a:hover {
        color: ${(p) => p.theme.colors.primary};
    }
`;

export const Delivery = styled.span`
    color: ${(p) => p.theme.colors.grey};
    white-space: nowrap;
    font-size: 13px;
    @media (max-width: 1100px) {
        display: none;
    }
`;

export const Telephone = styled.a`
    white-space: nowrap;
    font-size: 13px;
    @media (max-width: 767px) {
        display: none;
    }
`;
