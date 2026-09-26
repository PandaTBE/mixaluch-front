import styled from 'styled-components';

export const ContentWrapper = styled.div`
    margin-top: 26px;
    max-width: 680px;
    padding: 24px;
    border: 1px solid #eceae7;
    border-radius: 16px;
`;

export const UserData = styled.div`
    font-size: 18px;
    margin-top: 0;
    padding: 14px 0;
    border-bottom: 1px solid #eceae7;
    display: flex;
    gap: 20px;
    @media (max-width: 575px) {
        flex-direction: column;
        gap: 4px;
    }
    :first-child {
        margin-top: 0px;
    }
    span {
        margin-right: 10px;
        font-weight: 600;
    }
`;

export const PasswordInputWrapper = styled.div`
    width: 50%;
    margin-top: 15px;
`;

export const ButtonWrapper = styled.span`
    margin-top: 15px;
`;
