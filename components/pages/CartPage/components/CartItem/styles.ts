import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

export const ProductImage = styled.img`
    width: 165px;
    height: 165px;
`;

export const Wrapper = styled.div`
    padding: 10px;
    border-radius: 5px;
    border: ${(p) => `1px solid ${p.theme.border.primary}`};
`;

export const ProductTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

export const Price = styled.div`
    color: ${(p) => p.theme.colors.primary};
    font-size: 18px;
`;

export const QuantityInputWrapper = styled.div`
    width: 70%;
`;

export const StyledCloseIcon = styled(CloseIcon)`
    fill: ${(p) => p.theme.colors.primary} !important;
    font-size: 35px !important;
    align-self: flex-end !important;
    cursor: pointer;
`;

export const TotalPrice = styled.div`
    font-size: 1.5rem;
    align-self: flex-end;
`;
