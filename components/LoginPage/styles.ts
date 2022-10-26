import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export const Wrapper = styled.section`
    padding: 15px 0;
`;

export const InputsWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`;

export const StyledInput = styled(TextField)`
    margin-top: 20px;
    width: 50%;
`;

export const ButtonsWrapper = styled.div`
    margin-top: 15px;
`;

export const LoginButtonText = styled.div`
    color: white;
`;

export const LinkText = styled.div`
    color: ${(p) => p.theme.colors.primary};
    text-decoration: underline;
    cursor: pointer;
`;

export const ErrorWrapper = styled.div`
    margin-top: 20px;
    width: 50%;
`;
