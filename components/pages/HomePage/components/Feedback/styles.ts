import styled from 'styled-components';
import Button from '@mui/material/Button';

export const Wrapper = styled.section`
    margin: 8px 0 48px;
    padding: clamp(20px, 3.5vw, 44px);
    border: 1px solid #e8e1d9;
    border-radius: 22px;
    background: #f8f5f1;
`;

export const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
    gap: 40px;
    > div > p {
        color: #655d55;
        font-size: 15px;
        line-height: 1.6;
        max-width: 320px;
        margin: 16px 0 0;
    }
    #feedback-reply-hint {
        font-size: 13px;
    }
    @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 24px;
        > div > p {
            max-width: none;
        }
    }
`;

export const Title = styled.h2`
    font-size: clamp(26px, 3vw, 32px);
    line-height: 1.15;
    color: #292522;
    font-weight: 700;
    letter-spacing: -0.025em;
    margin: 0;
`;

export const FormWrapper = styled.div`
    min-width: 0;
`;

export const MessageWrapper = styled.div`
    &:not(:empty) {
        margin-bottom: 15px;
    }
`;

export const Form = styled.form`
    width: 100%;
    .MuiInputBase-root,
    .MuiInputLabel-root,
    .MuiFormHelperText-root {
        font-family: inherit;
    }
    .MuiOutlinedInput-root {
        background: #fff;
        border-radius: 10px;
    }
    .MuiInputLabel-root.Mui-focused {
        color: ${(p) => p.theme.colors.primary};
    }
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
        border-color: ${(p) => p.theme.colors.primary};
    }
    .MuiInputLabel-root.Mui-error {
        color: #d32f2f;
    }
    .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
        border-color: #d32f2f;
    }
`;

export const TextWrapper = styled.div`
    margin-top: 16px;
`;

export const SubmitButton = styled(Button).attrs({ variant: 'contained', disableElevation: true })`
    && {
        min-height: 46px;
        padding: 11px 20px;
        border-radius: 10px;
        background: #49382d;
        color: #fff;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        text-transform: none;
        gap: 8px;
    }
    &&:hover {
        background: #30241e;
    }
    &&.Mui-disabled {
        background: #e8e1d9;
        color: #655d55;
    }
    &&.Mui-focusVisible {
        outline: 2px solid #49382d;
        outline-offset: 4px;
    }
    @media (max-width: 600px) {
        && {
            width: 100%;
        }
    }
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-top: 16px;
`;
