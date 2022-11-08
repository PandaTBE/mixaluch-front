import styled from 'styled-components';

export const ContentWrapper = styled.div`
    margin-top: 15px;
`;

export const UserData = styled.div`
    font-size: 18px;
    margin-top: 10px;
    :first-child {
        margin-top: 0px;
    }
    span {
        margin-right: 10px;
        font-weight: 600;
    }
`;

export const CheckboxWrapper = styled.div`
    margin-top: 10px;
`;

export const ChangePasswordForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const PasswordInputWrapper = styled.div`
    width: 50%;
    margin-top: 15px;
`;

export const ButtonWrapper = styled.span`
    margin-top: 15px;
`;
