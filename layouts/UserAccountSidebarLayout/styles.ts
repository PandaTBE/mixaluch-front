import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    padding: 20px 0;
`;

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
    flex: 0 0 15%;
    padding-right: 10px;
`;

export const Section = styled.section`
    flex: 0 0 85%;
    padding-left: 10px;
`;
