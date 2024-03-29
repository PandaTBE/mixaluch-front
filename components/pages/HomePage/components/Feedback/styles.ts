import styled from 'styled-components';

export const Wrapper = styled.section`
    padding-bottom: 50px;

    @media (max-width: 575px) {
        padding-bottom: 25px;
    }
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.div`
    text-align: center;
    font-size: 32px;
    font-weight: 700;

    @media (max-width: 575px) {
        font-size: 28px;
    }
`;

export const FormWrapper = styled.div`
    margin-top: 20px;
    width: 50%;

    @media (max-width: 991px) {
        width: 75%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`;

export const MessageWrapper = styled.div`
    margin-top: 15px;
    width: 50%;

    @media (max-width: 991px) {
        width: 75%;
    }
    @media (max-width: 767px) {
        width: 100%;
    }
`;

export const Form = styled.form`
    width: 100%;
`;

export const TextWrapper = styled.div`
    margin-top: 20px;
`;

export const ButtonWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;
