import styled from 'styled-components';

export const Wrapper = styled.div`
    background-color: ${(p) => p.theme.backgroundColors.primary};
    @media (max-width: 767px) {
        display: none;
    }
`;

export const ContentWrapper = styled.div`
    min-height: 35px;
    padding: 5px 0;
    display: flex;
    align-items: center;
`;

export const Delivery = styled.div`
    color: ${(p) => p.theme.colors.grey};
    white-space: nowrap;
`;

export const Telephone = styled.a`
    cursor: pointer;
    white-space: nowrap;
`;

export const StyledLink = styled.li<{ active: boolean }>`
    color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.black)};
    white-space: nowrap;
`;

export const Nav = styled.nav`
    padding-right: 60px;
    list-style-type: none;
`;
