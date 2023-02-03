import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 0 0 15px 0;
`;

export const ButtonWrapper = styled.span`
    display: inline-block;
    margin-top: 15px;
    min-width: 120px;
`;

export const Text = styled.div`
    margin-top: 15px;
    font-size: 18px;
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
