import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Form = styled.form`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
`;

export const Wrapper = styled.div`
    padding: 0 0 15px 0;
`;

export const StyledInput = styled(TextField)`
    margin-top: 15px;
    width: 50%;
`;

export const ButtonWrapper = styled.div`
    margin-top: 15px;
`;

export const ResetConfirmButtonWrapper = styled.span`
    min-width: 155px;
    display: inline-block;
`;

export const MessageWrapper = styled.div`
    margin-top: 15px;
    width: 50%;
`;
