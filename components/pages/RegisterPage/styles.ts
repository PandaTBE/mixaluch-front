import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding-bottom: 15px;
`;

export const StyledForm = styled.form`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
`;

export const StyledInput = styled(TextField)<{ width?: string }>`
    margin-top: 20px !important;
    width: ${(p) => p.width || '50%'};
`;

export const ButtonsWrapper = styled.div`
    margin-top: 20px;
`;

export const LinkText = styled.div`
    color: ${(p) => p.theme.colors.primary};
    text-decoration: underline;
    cursor: pointer;
`;

export const RegisterButtonWrapper = styled.div`
    min-width: 175px;
`;

export const MessageWrapper = styled.div`
    margin-top: 15px;
    width: 50%;
`;
