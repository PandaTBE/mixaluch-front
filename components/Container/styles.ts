import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    @media (max-width: 1400px) {
        width: 1150px;
    }
    @media (max-width: 1200px) {
        width: 100%;
        padding: 0 20px;
    }
    @media (max-width: 991px) {
        padding: 0 15px;
    }

    @media (max-width: 767px) {
        padding: 0 10px;
    }
`;
