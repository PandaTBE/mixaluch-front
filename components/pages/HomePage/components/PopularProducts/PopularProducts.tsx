import { SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import PageTitle from '../../../../PageTitle/PageTitle';
import ProductCard from '../../../../ProductCard/ProductCard';
import { productReducerValues } from '../../../../../slices/Product/product';
import { useSelector } from 'react-redux';
import usePrepareData from './hooks/usePrepareData';
import { StyledArrowBackIcon, SwiperWrapper, StyledArrowForwardIcon, Wrapper, StyledSwiper } from './styles';
import { FC, useState } from 'react';
import { Stack } from '@mui/material';
import Skeleton from 'react-loading-skeleton';
import { Pagination } from 'swiper';

interface IProps {
    /** Флаг загрузки */
    isSkeleton?: boolean;
}

/**
 * Компонент для отображения популярных товаров
 */
const PopularProducts: FC<IProps> = ({ isSkeleton = false }) => {
    const [swiperInstance, setSwiperInstance] = useState<null | SwiperCore>(null);
    const { popularProducts } = useSelector(productReducerValues);
    const { swiperData } = usePrepareData();

    if (!popularProducts?.length && !isSkeleton) return null;

    return (
        <Wrapper>
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
                <StyledSwiper
                    onSwiper={(swiper: SwiperCore) => setSwiperInstance(swiper)}
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        450: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        992: {
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 5,
                        },
                    }}
                    modules={[Pagination]}
                    pagination={{
                        enabled: true,
                        clickable: true,
                    }}
                    loop={true}
                >
                    {isSkeleton
                        ? Array(6)
                              .fill(null)
                              .map((_, index) => {
                                  return (
                                      <SwiperSlide style={{ height: 'auto' }} key={index}>
                                          <Skeleton height={300} />
                                      </SwiperSlide>
                                  );
                              })
                        : popularProducts?.map((product) => {
                              return (
                                  <SwiperSlide style={{ height: 'auto' }} key={product.id}>
                                      <ProductCard imageHeight={swiperData.imageHeight} product={product} />
                                  </SwiperSlide>
                              );
                          })}
                </StyledSwiper>
            </SwiperWrapper>
        </Wrapper>
    );
};

export default PopularProducts;
