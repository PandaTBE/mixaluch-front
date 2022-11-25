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
import { FC, useMemo, useState } from 'react';
import { IProps } from './interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, cartReducerValues } from '../../slices/Cart/cart';
import QuantityInput from '../QuantityInput/QuantityInput';

/**
 * Компонент для отображения карточки продукта
 */
const ProductCard: FC<IProps> = ({ product, imageHeight }) => {
    const { cartItems } = useSelector(cartReducerValues);
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const onProductAdd = () => {
        dispatch(
            addCartItem({
                product,
                quantity,
            }),
        );
    };

    const cartItem = useMemo(() => {
        return cartItems.find((element) => element.product.id === product.id);
    }, [cartItems, product]);

    return (
        <Wrapper>
            <ImageWrapper>
                <Image
                    height={imageHeight}
                    src={
                        product.product_image.find((image) => image.is_feature)?.image || product.product_image[0].image
                    }
                />
            </ImageWrapper>
            <ContentWrapper>
                <Title>{product.title}</Title>
                <Price>{product.regular_price} ₽</Price>
                <ButtonWrapper>
                    {cartItem ? (
                        <QuantityInput defaultValue={cartItem.quantity} />
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
