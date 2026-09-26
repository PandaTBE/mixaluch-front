import styled from 'styled-components';

export const Wrapper = styled.section`
    margin-bottom: 40px;
`;

export const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
    @media (max-width: 1150px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @media (max-width: 900px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @media (max-width: 430px) {
        gap: 10px;
    }
`;
