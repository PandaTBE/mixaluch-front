import { SwiperSlide } from 'swiper/react';
import {
    ButtonContentWrapper,
    ButtonText,
    ButtonWrapper,
    ImageWrapper,
    MainSwiper,
    Price,
    BoxWrapper,
    ProductTitle,
    SideSwiper,
    Wrapper,
} from './styles';

import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { productReducerValues } from '../../../slices/Product/product';
import { Grid, Stack } from '@mui/material';
import Button from '../../Button/Button';
import QuantityInput from '../../QuantityInput/QuantityInput';
import { cartReducerValues } from '../../../slices/Cart/cart';
import useFetchData from '../../ProductCard/hooks/useFetchData';
import Image from 'next/image';

/**
 * Компонент для отображения страницы информации о товаре
 */
const ProductInfoPage = () => {
    const { addCartItem } = useFetchData();
    const { selectedProduct } = useSelector(productReducerValues);
    const { cartItems } = useSelector(cartReducerValues);
    const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperCore>(null);

    const onProductAdd = () => {
        selectedProduct && addCartItem(selectedProduct);
    };

    const cartItem = useMemo(() => {
        return cartItems.find((element) => element.product.id === selectedProduct?.id);
    }, [cartItems, selectedProduct]);

    const slides = useMemo(() => {
        if (selectedProduct?.product_image.length) {
            return selectedProduct?.product_image.map((image) => {
                return (
                    <SwiperSlide key={image.id}>
                        <ImageWrapper>
                            <Image objectFit={'scale-down'} src={image.image} alt={image.alt_text} layout="fill" />
                        </ImageWrapper>
                    </SwiperSlide>
                );
            });
        }
        return null;
    }, [selectedProduct?.product_image]);

    return (
        <Wrapper>
            {selectedProduct ? (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Stack direction={'row'} spacing={2} height={'100%'}>
                            <SideSwiper
                                onSwiper={setThumbsSwiper}
                                direction={'vertical'}
                                spaceBetween={10}
                                slidesPerView={3}
                                modules={[Navigation, Thumbs]}
                            >
                                {slides}
                            </SideSwiper>
                            <MainSwiper
                                navigation={true}
                                slidesPerView={1}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[Navigation, Thumbs]}
                            >
                                {slides}
                            </MainSwiper>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ProductTitle>{selectedProduct?.title}</ProductTitle>
                        <BoxWrapper>
                            <Stack justifyContent={'space-between'} direction={'row'} spacing={2}>
                                <Price>{selectedProduct?.regular_price} ₽</Price>
                                <ButtonWrapper>
                                    {cartItem && selectedProduct ? (
                                        <QuantityInput
                                            defaultValue={cartItem.quantity}
                                            cartItemId={cartItem.id}
                                            productId={selectedProduct.id}
                                        />
                                    ) : (
                                        <Button width={'100%'} clickHandler={onProductAdd}>
                                            <ButtonContentWrapper>
                                                <ButtonText>В корзину</ButtonText>
                                            </ButtonContentWrapper>
                                        </Button>
                                    )}
                                </ButtonWrapper>
                            </Stack>
                        </BoxWrapper>
                        {selectedProduct?.description && <BoxWrapper>{selectedProduct.description}</BoxWrapper>}
                    </Grid>
                </Grid>
            ) : (
                <div>Товар не найден</div>
            )}
        </Wrapper>
    );
};

export default ProductInfoPage;
