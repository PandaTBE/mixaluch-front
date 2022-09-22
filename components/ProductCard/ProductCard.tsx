import Button from '../Button/Button';
import { IProps } from './interfaces';
import { FC } from 'react';
import {
    ButtonContentWrapper,
    ContentWrapper,
    ButtonWrapper,
    ButtonText,
    Wrapper,
    Price,
    Title,
    Image,
} from './styles';

/**
 * Компонент для отображения карточки продукта
 * @param product Данные о продукте
 */
const ProductCard: FC<IProps> = ({ product }) => {
    const addToCart = () => {
        console.log('add to cart');
    };

    return (
        <Wrapper>
            <Image
                src={product.product_image.find((image) => image.is_feature)?.image || product.product_image[0].image}
            />
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
