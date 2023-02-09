import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Wrapper = styled.div`
    padding-bottom: 15px;
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const NameWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    column-gap: 16px;
    width: 50%;

    @media (max-width: 991px) {
        width: 80%;
    }
    @media (max-width: 575px) {
        flex-wrap: wrap;
        width: 100%;
    }
`;

export const StyledInput = styled(TextField)<{ width?: string }>`
    margin-top: 20px !important;
    width: ${(p) => p.width || '50%'};

    @media (max-width: 991px) {
        width: 80%;
    }
    @media (max-width: 575px) {
        width: 100%;
    }
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

    @media (max-width: 991px) {
        width: 80%;
    }
    @media (max-width: 575px) {
        width: 100%;
    }
`;
