import { PersonOutlineOutlined } from '@mui/icons-material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 15px 0;
`;

export const Logo = styled.img`
    width: 220px;
    cursor: pointer;
    @media (max-width: 575px) {
        width: 150px;
    }
`;

export const LoginIcon = styled(PersonOutlineOutlined)`
    fill: ${(p) => p.theme.colors.primary} !important;
    width: 30px !important;
    height: 30px !important;
    font-size: 30px !important;
    cursor: pointer;

    @media (max-width: 767px) {
        display: none !important;
    }
`;

export const CartIcon = styled(ShoppingCartOutlinedIcon)`
    fill: ${(p) => p.theme.colors.primary} !important;
    width: 30px !important;
    height: 30px !important;
    font-size: 30px !important;
    cursor: pointer;
`;

export const TotalItems = styled.div`
    top: -5px;
    right: -10px;
    color: white;
    position: absolute;
    background-color: ${(p) => p.theme.colors.primary};
    border-radius: 50%;
    min-height: 18px;
    min-width: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CartIconWrapper = styled.div`
    position: relative;
    @media (max-width: 767px) {
        margin-right: 10px;
    }
`;

export const ContentWrapper = styled.div``;

export const TotalSum = styled.div`
    color: ${(p) => p.theme.colors.primary};
    font-size: 18px;
    font-weight: 600;
    @media (max-width: 767px) {
        display: none;
    }
`;

export const CartWrapper = styled.div`
    cursor: pointer;
`;

export const MenuIconWrapper = styled.div`
    color: ${(p) => p.theme.colors.primary};
    display: none;
    @media (max-width: 767px) {
        display: block;
    }
`;
