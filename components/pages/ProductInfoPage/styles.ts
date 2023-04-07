import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const Wrapper = styled.div`
    padding: 20px 0;
`;

export const ImageWrapper = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
`;

export const SideSwiper = styled(Swiper)`
    box-sizing: border-box;
    flex: 0 0 20%;

    width: 100%;
    .swiper-slide {
        opacity: 0.6;
        img {
            cursor: pointer;
        }
    }

    .swiper-slide-thumb-active {
        opacity: 1;
    }
`;

export const MainSwiper = styled(Swiper)`
    flex: 0 0 75%;
    .swiper-button-prev,
    .swiper-button-next {
        display: none;
        color: ${(p) => p.theme.colors.primary};
        ::after {
            font-size: 30px;
        }
    }

    :hover {
        .swiper-button-prev,
        .swiper-button-next {
            display: block;
        }
    }
`;

export const ProductTitle = styled.h1`
    font-size: 32px;
    font-weight: 700;
    margin: 0;
`;

export const BoxWrapper = styled.div`
    padding: 15px;
    background-color: #f7f7f7;
    margin-top: 20px;
    border-radius: 5px;
`;

export const Price = styled.div`
    font-size: 2rem;
    font-weight: 600;
    line-height: 2rem;
    white-space: nowrap;
`;

export const ButtonWrapper = styled.div`
    width: 160px;
`;

export const ButtonContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonText = styled.div`
    color: #ffff;
    margin-right: 5px;
`;
