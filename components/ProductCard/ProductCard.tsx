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
import { FC } from 'react';
import { IProps } from './interfaces';

/**
 * Компонент для отображения карточки продукта
 */
const ProductCard: FC<IProps> = ({ product, imageHeight }) => {
    const addToCart = () => {
        console.log('add to cart');
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
                    <Button width={'100%'} clickHandler={addToCart}>
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
