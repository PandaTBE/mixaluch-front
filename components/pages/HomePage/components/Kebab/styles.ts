import styled from 'styled-components';

export const Wrapper = styled.section`
    padding-bottom: 50px;
    @media (max-width: 575px) {
        padding-bottom: 25px;
    }
`;

export const ContentWrapper = styled.div`
    min-height: 320px;
    padding: 15px 40px;
    background-image: url('/kebab/kebab.jpeg');
    background-size: cover;
    background-position: 50% 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 575px) {
        padding: 20px;
    }
`;

export const Layout = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const Title = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: white;
    z-index: 5;
    @media (max-width: 575px) {
        font-size: 1.75rem;
    }
`;

export const SubTitle = styled.div`
    font-size: 1.5rem;
    margin-top: 20px;
    color: white;
    z-index: 5;

    @media (max-width: 575px) {
        font-size: 1.35rem;
    }
`;

export const ButtonWrapper = styled.div`
    display: inline-block;
    margin-top: 20px;
    z-index: 5;
`;
