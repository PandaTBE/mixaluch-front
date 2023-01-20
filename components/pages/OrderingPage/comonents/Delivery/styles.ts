import { Checkbox } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.section`
    margin-top: 15px;
`;

export const Title = styled.h2`
    font-size: 1.7rem;
    font-weight: 700;
    margin: 0;
    margin-top: 15px;
`;

export const Form = styled.form``;

export const ButtonWrapper = styled.div`
    margin-top: 15px;
`;

export const DeliveryCost = styled.div`
    font-weight: bold;
    font-size: 1.25rem;
`;

export const DeliveryTypeWrapper = styled.div`
    cursor: pointer;
    margin-top: 5px;
    padding: 5px;
    box-sizing: border-box;
    :hover {
        outline: ${(p) => `1px solid ${p.theme.border.primary}`};
        border-radius: 5px;
    }
`;

export const StyledCheckbox = styled(Checkbox)`
    color: ${(p) => p.theme.colors.primary} !important;
    svg {
        fill: ${(p) => p.theme.colors.primary} !important;
    }
`;
