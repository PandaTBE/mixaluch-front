import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

export const ProductImageWrapper = styled.div`
    flex: 0 0 165px;
    height: 165px;
    position: relative;

    @media (max-width: 599px) {
        flex: 0 0 80px;
        height: 80px;
    }
`;

export const Wrapper = styled.div`
    padding: 10px;
    border-radius: 5px;
    border: ${(p) => `1px solid ${p.theme.border.primary}`};
`;

export const ProductTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;

    @media (max-width: 599px) {
        font-size: 1rem;
    }
`;

export const Price = styled.div`
    color: ${(p) => p.theme.colors.primary};
    font-size: 18px;
`;

export const QuantityInputWrapper = styled.div`
    width: 200px;
    @media (max-width: 599px) {
        display: none;
    }
`;

export const StyledCloseIcon = styled(CloseIcon)`
    fill: ${(p) => p.theme.colors.primary} !important;
    font-size: 35px !important;
    align-self: flex-end !important;
    cursor: pointer;

    @media (max-width: 599px) {
        font-size: 25px !important;
    }
`;

export const TotalPrice = styled.div`
    font-size: 1.5rem;
    /* align-self: flex-end; */
    white-space: nowrap;
    @media (max-width: 599px) {
        font-size: 1rem;
    }
`;

export const TotalPriceWrapper = styled.div`
    @media (max-width: 599px) {
        display: none;
    }
`;

export const FooterWrapper = styled.div`
    display: none;
    margin-top: 10px;
    @media (max-width: 599px) {
        display: block;
    }
`;

export const FooterQuantityInputWrapper = styled.div`
    width: 150px;
`;
