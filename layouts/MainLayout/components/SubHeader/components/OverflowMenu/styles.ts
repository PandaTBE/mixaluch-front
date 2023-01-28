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
    background-color: #ededed;
    padding: 5px 20px;
`;

export const Nav = styled.nav`
    list-style-type: none;
`;

export const StyledLink = styled.li<{ active: boolean }>`
    color: ${(props) => (props.active ? props.theme.colors.primary : props.theme.colors.black)};
    white-space: nowrap;
    font-weight: 700;
    font-size: 22px;
    margin-top: 15px;
    :first-child {
        margin-top: 0px;
    }
`;

export const Delivery = styled.div`
    color: #999999;
    font-size: 20px;
    margin-top: 15px;
`;

export const Logo = styled.img`
    width: 120px;
    cursor: pointer;
`;

export const StyledDrawer = styled(Drawer)`
    .MuiPaper-root {
        width: 70%;
    }
    @media (max-width: 575px) {
        .MuiPaper-root {
            width: 80%;
        }
    }
`;

export const Telephone = styled.a`
    font-size: 20px;
    margin-top: 15px;
    display: block;
    font-weight: 500;
`;
