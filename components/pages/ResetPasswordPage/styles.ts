import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 0 0 15px 0;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

export const StyledInput = styled(TextField)`
    width: 50%;

    @media (max-width: 991px) {
        width: 75%;
    }
    @media (max-width: 575px) {
        width: 100%;
    }
`;

export const ButtonsWrapper = styled.div`
    margin-top: 15px;
`;

export const ResetButtonWrapper = styled.span`
    min-width: 130px;
    display: inline-block;
`;

export const MessageWrapper = styled.div`
    margin-top: 15px;
    width: 50%;

    @media (max-width: 991px) {
        width: 75%;
    }
    @media (max-width: 575px) {
        width: 100%;
    }
`;
