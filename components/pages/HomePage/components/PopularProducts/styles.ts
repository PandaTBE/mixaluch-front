import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Swiper } from 'swiper/react';

export const SwiperWrapper = styled.div`
    margin-top: 15px;
`;

export const StyledArrowBackIcon = styled(ArrowBackIcon)`
    fill: ${(p) => p.theme.colors.primary} !important;
    cursor: pointer;
    @media (max-width: 767px) {
        display: none !important;
    }
`;

export const StyledArrowForwardIcon = styled(ArrowForwardIcon)`
    fill: ${(p) => p.theme.colors.primary} !important;
    cursor: pointer;
    @media (max-width: 767px) {
        display: none !important;
    }
`;

export const Wrapper = styled.section`
    padding-bottom: 50px;
    @media (max-width: 575px) {
        padding-bottom: 25px;
    }
`;

export const StyledSwiper = styled(Swiper)`
    .swiper-pagination {
        display: none !important;
    }
    @media (max-width: 767px) {
        padding-bottom: 30px;

        .swiper-pagination {
            display: flex !important;
            column-gap: 10px;
            width: auto;
            bottom: 5px;
            .swiper-pagination-bullet-active {
                background: ${(p) => p.theme.colors.primary};
            }

            .swiper-pagination-bullet {
                margin: 0 !important;
            }
        }
    }
`;
