import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { A11y } from 'swiper';
import { Layout, SlideArrowWrapper, SlideText, SlideWrapper, Wrapper } from './styles';
import { promoCarouselSlidesContent } from './constants/constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';

/**
 * Компонент для отображения промо карусели
 */
const PromoCarousel = () => {
    const [swiperInstance, setSwiperInstance] = useState<null | SwiperCore>(null);

    return (
        <Wrapper>
            <Swiper onSwiper={(swiper) => setSwiperInstance(swiper)} slidesPerView={1} modules={[A11y]} loop={true}>
                {promoCarouselSlidesContent.map((element) => {
                    return (
                        <SwiperSlide key={element.id}>
                            <SlideWrapper image={element.image}>
                                <Layout />
                                <SlideText>{element.text}</SlideText>
                            </SlideWrapper>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <SlideArrowWrapper onClick={() => swiperInstance?.slidePrev()} side="left">
                <ArrowBackIosNewIcon htmlColor="white" />
            </SlideArrowWrapper>
            <SlideArrowWrapper onClick={() => swiperInstance?.slideNext()} side="right">
                <ArrowForwardIosIcon htmlColor="white" />
            </SlideArrowWrapper>
        </Wrapper>
    );
};

export default PromoCarousel;
