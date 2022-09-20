import styled from 'styled-components';

export const Wrapper = styled.div`
    max-width: 1300px;
    margin: 0 auto;

    @media (max-width: 1400px) {
        width: 1150px;
    }
    @media (max-width: 1200px) {
        width: 100%;
        padding: 0 10px;
    }
`;
