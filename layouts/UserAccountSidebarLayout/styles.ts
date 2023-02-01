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

export const NavigationWrapper = styled.div`
    display: block;

    @media (max-width: 767px) {
        display: none;
    }
`;

export const AccordionNavigationWrapper = styled.div`
    display: none;
    width: 100%;
    @media (max-width: 767px) {
        display: block;
    }
`;

export const AccordionTitle = styled.div`
    font-size: 18px;
`;
