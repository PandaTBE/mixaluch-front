import { PersonOutlineOutlined } from '@mui/icons-material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 15px 0;
`;

export const Logo = styled.img`
    width: 220px;
    cursor: pointer;
`;

export const LoginIcon = styled(PersonOutlineOutlined)`
    fill: ${(p) => p.theme.colors.primary};
    width: 30px;
    height: 30px;
    font-size: 30px;
    cursor: pointer;
`;

export const CartIcon = styled(ShoppingCartOutlinedIcon)`
    fill: ${(p) => p.theme.colors.primary};
    width: 30px;
    height: 30px;
    font-size: 30px;

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
`;

export const ContentWrapper = styled.div``;

export const TotalSum = styled.div`
    color: ${(p) => p.theme.colors.primary};
    font-size: 18px;
    font-weight: 600;
`;

export const CartWrapper = styled.div`
    cursor: pointer;
`;
