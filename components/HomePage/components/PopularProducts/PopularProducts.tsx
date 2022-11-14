import { A11y, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import PageTitle from '../../../PageTitle/PageTitle';
import ProductCard from '../../../ProductCard/ProductCard';
import { productReducerValues } from '../../../../slices/Product/product';
import { useSelector } from 'react-redux';

const PopularProducts = () => {
    const { popularProducts } = useSelector(productReducerValues);
    return (
        <section>
            <PageTitle>
                <div>Популярные товары</div>
            </PageTitle>
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
                            <ProductCard product={product} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </section>
    );
};

export default PopularProducts;
