import styled from 'styled-components';

export const Wrapper = styled.section`
    padding-bottom: 50px;
    position: relative;
    @media (max-width: 767px) {
        padding-bottom: 25px;
    }
`;

export const SlideWrapper = styled.div`
    width: 100%;
    height: 500px;
    display: flex;
    text-align: center;
    padding: 0px 50px;
    position: relative;
    justify-content: center;
    align-items: center;
    @media (max-width: 1400px) {
        height: 450px;
    }
    @media (max-width: 1200px) {
        height: 400px;
    }
    @media (max-width: 991px) {
        height: 350px;
    }
    @media (max-width: 767px) {
        height: 300px;
    }
    @media (max-width: 575px) {
        height: 200px;
    }
`;

export const SlideArrowWrapper = styled.div<{ side: 'left' | 'right' }>`
    position: absolute;
    top: 50%;
    transform: translateY(-100%);
    left: ${(p) => (p.side === 'left' ? '20px' : 'auto')};
    right: ${(p) => (p.side === 'right' ? '20px' : 'auto')};
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const Layout = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

export const SlideText = styled.div`
    color: white;
    font-size: 3rem;
    line-height: 3rem;
    z-index: 5;
    @media (max-width: 767px) {
        font-size: 2rem;
        line-height: 2rem;
    }
    @media (max-width: 575px) {
        font-size: 1.3rem;
        line-height: 1.3rem;
    }
`;
