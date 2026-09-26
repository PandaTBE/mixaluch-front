import { Stack, Checkbox, FormControlLabel, Switch, TextField } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.section`
    padding: 28px;
    border: 1px solid #ebe7e3;
    border-radius: 18px;
    background: #fff;
    @media (max-width: 575px) {
        padding: 20px 16px;
        border-radius: 14px;
    }
`;

export const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    margin: 8px 0 2px;
    color: #302d2b;
    letter-spacing: -0.02em;
`;

export const Form = styled.form``;

export const ButtonWrapper = styled.div`
    margin-top: 15px;
    button {
        min-height: 48px;
        border-radius: 12px;
        font-weight: 650;
    }
`;

export const DeliveryCost = styled.div`
    font-weight: bold;
    font-size: 1.25rem;
    white-space: nowrap;
`;

export const CheckboxWrapper = styled.label`
    cursor: pointer;
    margin-top: 0;
    padding: 12px 14px;
    box-sizing: border-box;
    border: 1px solid #eceae7;
    border-radius: 12px;
    &:has(input:checked) {
        border-color: ${(p) => p.theme.colors.primary};
        background: #fff8f5;
    }
    &:hover:not(:has(input:disabled)) {
        border-color: ${(p) => p.theme.colors.primary};
    }
    &:has(input:disabled) {
        cursor: not-allowed;
        color: #747474;
        background: #f5f5f5;
        border-color: #eceae7;
    }
`;

export const StyledCheckbox = styled(Checkbox)`
    color: ${(p) => p.theme.colors.primary} !important;
    svg {
        fill: ${(p) => p.theme.colors.primary} !important;
    }
    &.Mui-disabled,
    &.Mui-disabled svg {
        color: #aaa !important;
        fill: #aaa !important;
    }
`;

export const CheckboxLabel = styled.div`
    font-size: 15px;
`;

export const CheckboxSubLabel = styled.div`
    color: rgb(116, 116, 116);
    margin-top: 4px;
    span {
        display: inline-block;
        margin-right: 5px;
    }
`;

export const StyledTextField = styled(TextField)`
    & .MuiOutlinedInput-root {
        border-radius: 11px;
    }
`;

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

export const CheckboxRow = styled(Stack)`
    && {
        align-items: center;
    }
`;

export const DeliveryOptionRow = styled(CheckboxRow)`
    && {
        justify-content: space-between;
    }
`;
