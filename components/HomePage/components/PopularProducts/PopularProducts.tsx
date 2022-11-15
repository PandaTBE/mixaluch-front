import { A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

import PageTitle from '../../../PageTitle/PageTitle';
import ProductCard from '../../../ProductCard/ProductCard';
import { productReducerValues } from '../../../../slices/Product/product';
import { useSelector } from 'react-redux';
import usePrepareData from './hooks/usePrepareData';
import { StyledArrowBackIcon, SwiperWrapper, StyledArrowForwardIcon } from './styles';
import { useState } from 'react';
import { Stack } from '@mui/material';

/**
 * Компонент для отображения популярных товаров
 */
const PopularProducts = () => {
    const [swiperInstance, setSwiperInstance] = useState<null | SwiperCore>(null);
    const { popularProducts } = useSelector(productReducerValues);
    const { swiperData } = usePrepareData();

    if (!popularProducts?.length) return null;

    return (
        <section>
            <Stack direction="row" alignItems="center" spacing={2} justifyContent={'space-between'}>
                <PageTitle>
                    <div>Популярные товары</div>
                </PageTitle>
                <Stack direction="row" spacing={1}>
                    <StyledArrowBackIcon onClick={() => swiperInstance?.slidePrev()} />
                    <StyledArrowForwardIcon onClick={() => swiperInstance?.slideNext()} />
                </Stack>
            </Stack>

            <SwiperWrapper>
                <Swiper
                    onSwiper={(swiper) => setSwiperInstance(swiper)}
                    slidesPerView={swiperData.slidesPerView}
                    spaceBetween={swiperData.spaceBetween}
                    modules={[A11y]}
                    loop={true}
                >
                    {popularProducts?.map((product) => {
                        return (
                            <SwiperSlide style={{ height: 'auto' }} key={product.id}>
                                <ProductCard imageHeight={swiperData.imageHeight} product={product} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </SwiperWrapper>
        </section>
    );
};

export default PopularProducts;
