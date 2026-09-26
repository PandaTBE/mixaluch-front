import styled from 'styled-components';
import { Stack } from '@mui/material';
import { Swiper } from 'swiper/react';

export const Wrapper = styled.div`
    padding: 28px 0 64px;
    > a {
        color: ${(p) => p.theme.colors.primary};
        text-decoration: none;
    }
    > a:hover {
        text-decoration: underline;
    }
    > a:focus-visible {
        outline: 2px solid ${(p) => p.theme.colors.primary};
        outline-offset: 3px;
    }
`;

export const ImageWrapper = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 16px;
    background: #f8f7f5;
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
    font-size: clamp(28px, 3vw, 40px);
    font-weight: 700;
    margin: 0;
    line-height: 1.15;
`;

export const BoxWrapper = styled.div`
    padding: 24px;
    background-color: #f8f7f5;
    margin-top: 20px;
    border-radius: 18px;
    line-height: 1.6;
`;

export const Price = styled.div`
    font-size: 2rem;
    font-weight: 600;
    line-height: 2rem;
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

export const BackLink = styled.a`
    display: inline-block;
    margin-bottom: 24px;
`;

export const ProductGallery = styled(Stack)`
    && {
        height: 400px;

        @media (min-width: 600px) {
            height: 300px;
        }

        @media (min-width: 900px) {
            height: 500px;
        }
    }
`;

export const PurchaseRow = styled(Stack)`
    && {
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
    }
`;
