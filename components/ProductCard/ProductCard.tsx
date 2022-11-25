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
import { FC, useState } from 'react';
import { IProps } from './interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, cartReducerValues } from '../../slices/Cart/cart';

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
                    <Button width={'100%'} clickHandler={onProductAdd}>
                        <ButtonContentWrapper>
                            <ButtonText>В корзину</ButtonText>
                        </ButtonContentWrapper>
                    </Button>
                </ButtonWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default ProductCard;
