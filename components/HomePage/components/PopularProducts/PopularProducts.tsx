import { A11y, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import PageTitle from '../../../PageTitle/PageTitle';
import ProductCard from '../../../ProductCard/ProductCard';
import { productReducerValues } from '../../../../slices/Product/product';
import { useSelector } from 'react-redux';
import usePrepareData from './hooks/usePrepareData';
import { SwiperWrapper } from './styles';

const PopularProducts = () => {
    const { popularProducts } = useSelector(productReducerValues);
    usePrepareData();
    if (!popularProducts?.length) return null;

    return (
        <section>
            <PageTitle>
                <div>Популярные товары</div>
            </PageTitle>
            <SwiperWrapper>
                <Swiper
                    spaceBetween={25}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination, A11y]}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {popularProducts?.map((product) => {
                        return (
                            <SwiperSlide style={{ height: 'auto' }} key={product.id}>
                                <ProductCard imageHeight={'250px'} product={product} />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </SwiperWrapper>
        </section>
    );
};

export default PopularProducts;
