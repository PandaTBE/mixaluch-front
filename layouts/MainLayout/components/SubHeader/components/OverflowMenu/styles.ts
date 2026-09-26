import { Drawer } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const BodyWrapper = styled.div`
    padding: 20px;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(p) => p.theme.colors.primary};
    background-color: #f6f5f3;
    padding: 5px 20px;
`;

export const Nav = styled.nav`
    list-style-type: none;
`;

export const StyledLink = styled.li<{ active: boolean }>`
    color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.black)};
    white-space: nowrap;
    font-weight: 700;
    font-size: 18px;
    margin-top: 15px;
    :first-child {
        margin-top: 0px;
    }
`;

export const Contacts = styled.footer`
    border-top: 1px solid #eee;
    margin-top: 20px;
    padding-top: 16px;
`;

export const Delivery = styled.div`
    color: ${(p) => p.theme.colors.black};
    font-size: 14px;
    line-height: 1.5;

    span {
        display: block;
        margin-bottom: 4px;
        color: #666;
        font-size: 13px;
    }
`;

export const CategorySection = styled.section`
    border-top: 1px solid #eee;
    margin-top: 20px;
    padding-top: 16px;
    h2 {
        font-size: 17px;
        margin: 0 0 8px;
    }
    ul {
        padding: 0;
        margin: 0;
    }
`;

export const LogoWrapper = styled.a`
    width: 120px;
    cursor: pointer;
    height: 19px;
    position: relative;
`;

export const StyledDrawer = styled(Drawer)`
    .MuiPaper-root {
        width: min(350px, 85vw);
    }
`;

export const Telephone = styled.a`
    display: flex;
    align-items: center;
    min-height: 44px;
    margin-top: 4px;
    color: ${(p) => p.theme.colors.black};
    font-size: 16px;
    line-height: 1.5;
    font-weight: 500;

    &:hover {
        color: ${(p) => p.theme.colors.primary};
    }

    &:focus-visible {
        outline: 2px solid ${(p) => p.theme.colors.primary};
        outline-offset: 2px;
    }
`;
