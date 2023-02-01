import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    flex-grow: 0;
    display: flex;
    padding: 20px 0;

    @media (max-width: 767px) {
        flex-wrap: wrap;
    }
`;

export const Section = styled.section`
    flex: 0 0 80%;
    padding-left: 10px;

    @media (max-width: 767px) {
        padding-left: 0;
        flex: 0 0 100%;
        margin-top: 15px;
    }
`;

export const Navigation = styled.div`
    flex: 0 0 20%;
    padding-right: 10px;

    @media (max-width: 767px) {
        flex: 0 0 100%;
        padding-right: 0;
    }
`;
