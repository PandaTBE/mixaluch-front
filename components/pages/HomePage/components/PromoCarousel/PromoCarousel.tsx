import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { A11y } from 'swiper';
import { Layout, SlideArrowWrapper, SlideText, SlideWrapper, Wrapper } from './styles';
// import { promoCarouselSlidesContent } from './constants/constants';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
import Image from 'next/image';

/**
 * Компонент для отображения промо карусели
 */
const PromoCarousel = () => {
    const [swiperInstance, setSwiperInstance] = useState<null | SwiperCore>(null);

    const promoCarouselSlidesContent = [
        { id: 1, text: 'Продукты высокого качества', image: '/static/promoCarousel/promoSlide1.jpeg' },
        { id: 2, text: 'Широкий ассортимент', image: '/static/promoCarousel/promoSlide2.jpeg' },
    ];

    return (
        <Wrapper>
            <Swiper onSwiper={(swiper) => setSwiperInstance(swiper)} slidesPerView={1} modules={[A11y]} loop={true}>
                {promoCarouselSlidesContent.map((element) => (
                    <SwiperSlide key={element.id}>
                        <SlideWrapper>
                            <Image
                                priority={true}
                                objectFit={'cover'}
                                src={element.image}
                                alt={element.text}
                                layout={'fill'}
                            />
                            <Layout />
                            <SlideText>{element.text}</SlideText>
                        </SlideWrapper>
                    </SwiperSlide>
                ))}
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
