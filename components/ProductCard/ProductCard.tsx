import {
    ButtonContentWrapper,
    ButtonText,
    ButtonWrapper,
    ContentWrapper,
    Image,
    ImageWrapper,
    Price,
    Title,
    Wrapper,
} from './styles';

import Button from '../Button/Button';
import { FC, useMemo } from 'react';
import { IProps } from './interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { cartReducerValues } from '../../slices/Cart/cart';
import QuantityInput from '../QuantityInput/QuantityInput';
import useFetchData from './hooks/useFetchData';
import { useRouter } from 'next/router';
import { storePageToSwitch } from '../../slices/General/general';

/**
 * Компонент для отображения карточки продукта
 */
const ProductCard: FC<IProps> = ({ product, imageHeight }) => {
    const { cartItems } = useSelector(cartReducerValues);
    const { addCartItem } = useFetchData();
    const dispatch = useDispatch();
    const router = useRouter();

    const onProductAdd = () => {
        addCartItem(product);
    };

    const onProductClick = () => {
        dispatch(storePageToSwitch('/catalog/[id]'));
        router.push(`/catalog/${product.id}`);
    };

    const cartItem = useMemo(() => {
        return cartItems.find((element) => element.product.id === product.id);
    }, [cartItems, product]);

    return (
        <Wrapper>
            <ImageWrapper onClick={onProductClick}>
                <Image
                    height={imageHeight}
                    src={
                        product.product_image.find((image) => image.is_feature)?.image || product.product_image[0].image
                    }
                />
            </ImageWrapper>
            <ContentWrapper>
                <Title onClick={onProductClick}>{product.title}</Title>
                <Price>{product.regular_price} ₽</Price>
                <ButtonWrapper>
                    {cartItem ? (
                        <QuantityInput
                            defaultValue={cartItem.quantity}
                            cartItemId={cartItem.id}
                            productId={product.id}
                        />
                    ) : (
                        <Button width={'100%'} clickHandler={onProductAdd}>
                            <ButtonContentWrapper>
                                <ButtonText>В корзину</ButtonText>
                            </ButtonContentWrapper>
                        </Button>
                    )}
                </ButtonWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default ProductCard;
