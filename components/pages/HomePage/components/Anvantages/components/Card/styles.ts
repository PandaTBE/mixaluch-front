import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.div`
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: 15px;
    text-align: center;
    @media (max-width: 767px) {
        font-size: 1.3rem;
    }
    @media (max-width: 575px) {
        font-size: 1.2rem;
    }
`;

export const Text = styled.div`
    margin-top: 10px;
    text-align: center;
    font-size: 1.4rem;
    @media (max-width: 767px) {
        display: none;
    }
`;
