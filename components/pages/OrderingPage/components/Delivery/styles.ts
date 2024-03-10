import { Checkbox, FormControlLabel, Switch, TextField } from '@mui/material';
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
    white-space: nowrap;
`;

export const CheckboxWrapper = styled.div`
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

export const CheckboxLabel = styled.div`
    font-size: 20px;
`;

export const CheckboxSubLabel = styled.div`
    color: rgb(116, 116, 116);
    margin-top: 10px;
    span {
        display: inline-block;
        margin-right: 5px;
    }
`;

export const StyledTextField = styled(TextField)``;

export const StyledSwitch = styled(Switch)`
    & .MuiSwitch-switchBase.Mui-checked {
        color: ${(p) => p.theme.colors.primary} !important;
    }

    & .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
        background-color: ${(p) => p.theme.colors.primarySmooth} !important;
    }
`;

export const StyledFormControlLabel = styled(FormControlLabel)`
    & .MuiTypography-root {
        font-size: 20px;
    }
`;
