import styled from 'styled-components';

export const NavItem = styled.div`
    margin-top: 15px;
    font-size: 16px;
    color: ${(p) => p.theme.colors.primary};
    text-decoration: underline;
    cursor: pointer;
    :first-child {
        margin-top: 0px;
    }
`;

export const Aside = styled.aside`
    flex: 0 0 20%;
    padding-right: 10px;

    @media (max-width: 767px) {
        flex: 0 0 100%;
        padding-right: 0;
    }
`;
