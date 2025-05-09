import { CircularProgress } from '@mui/material';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import styled from 'styled-components';

interface IButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    width: string;
    disabled: boolean;
}

export const Wrapper = styled.button<IButtonProps>`
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background-color: ${(p) => p.theme.colors.primary};
    transition: color 0.15s ease-in-out, background 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    outline: none;
    padding: 5px 10px;
    width: ${(p) => p.width};
    border: 0;
    opacity: ${(p) => (p.disabled ? 0.5 : 1)};
    :hover {
        cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
        background-color: ${(p) => (p.disabled ? p.theme.colors.primary : p.theme.colors.primarySmooth)};
    }
    min-height: 40px;
    font-size: 16px;
    font-family: ${(p) => p.theme.fontFamily.default};
`;

export const SpinnerWrapper = styled.span`
    color: white;
`;

export const StyledCircularProgress = styled(CircularProgress)`
    width: 25px !important;
    height: 25px !important;
`;
