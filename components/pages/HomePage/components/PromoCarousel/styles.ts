import styled from 'styled-components';

export const Wrapper = styled.section`
    padding-bottom: 50px;
    position: relative;
`;

export const SlideWrapper = styled.div<{ image: string }>`
    width: 100%;
    height: 500px;
    position: relative;
    background-image: ${(p) => `url(${p.image})`};
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    text-align: center;
    padding: 0px 50px;
    justify-content: center;
    align-items: center;
    background-position: 50% 50%;
    @media (max-width: 1400px) {
        height: 450px;
    }
    @media (max-width: 1200px) {
        height: 400px;
    }
    @media (max-width: 991px) {
        height: 350px;
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
`;
