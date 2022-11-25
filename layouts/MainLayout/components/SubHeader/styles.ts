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

export const ContentWrapper = styled.div``;
