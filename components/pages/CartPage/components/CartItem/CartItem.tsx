import Image from 'next/image';
import { FC } from 'react';
import {
    googleAnalytics4DataLayers,
    sendNewDataLayer,
} from '../../../../../services/GoogleAnalytics4Service/GoogleAnalytics4Service';
import { IExtendedCartItem } from '../../../../../slices/Cart/interfaces';
import QuantityInput from '../../../../QuantityInput/QuantityInput';
import useFetchData from './hooks/useFetchData';
import {
    ItemDetails,
    ProductSummary,
    ItemMain,
    ItemActions,
    ItemPrice,
    Price,
    UnitPriceRow,
    ProductImageWrapper,
    ProductTitle,
    QuantityInputWrapper,
    StyledCloseIcon,
    TotalPrice,
    UnitWrapper,
    Wrapper,
} from './styles';
import { useTranslation } from 'react-i18next';
import { IProductImage } from '../../../../../models/Product';
import { formatProductPrice } from '../../../../../tools/productPrice';
import NegotiablePrice from '../../../../NegotiablePrice/NegotiablePrice';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface IProps {
    /** Элемент корзины */
    cartItem: IExtendedCartItem;
    /** Обработчик нажатия на название товара */
    onCartItemTitleClick: (productId: number) => void;
}

/**
 * Компонент для отображения товара в корзине
 */
const CartItem: FC<IProps> = ({ cartItem, onCartItemTitleClick }) => {
    const { deleteCartItem } = useFetchData();

    const { t } = useTranslation();

    const onRemoveClick = () => {
        sendNewDataLayer(googleAnalytics4DataLayers.generateRemoveFromCart(cartItem));
        deleteCartItem(cartItem.product.id, cartItem.id);
    };

    const image =
        cartItem.product.product_image.find((element) => element.is_feature) ||
        (cartItem.product.product_image[0] as IProductImage | undefined);

    const onTitleClick = () => {
        onCartItemTitleClick(cartItem.product.id);
    };

    return (
        <Wrapper>
            <ItemMain>
                <ProductSummary direction="row" spacing={2}>
                    <ProductImageWrapper onClick={onTitleClick} aria-label={`Открыть товар: ${cartItem.product.title}`}>
                        <Image layout="fill" src={image?.image || ''} alt={image?.alt_text || cartItem.product.title} />
                    </ProductImageWrapper>
                    <ItemDetails>
                        <ProductTitle type="button" onClick={onTitleClick}>
                            {cartItem.product.title}
                        </ProductTitle>
                        <UnitPriceRow direction="row" spacing={1}>
                            {cartItem.product.is_negotiable_price ? (
                                <NegotiablePrice />
                            ) : (
                                <>
                                    <Price>{formatProductPrice(cartItem.product)}</Price>
                                    <UnitWrapper>за 1 {t(cartItem.product.unit)}</UnitWrapper>
                                </>
                            )}
                        </UnitPriceRow>
                    </ItemDetails>
                </ProductSummary>
                <QuantityInputWrapper>
                    <QuantityInput
                        minQuantityValue={cartItem.product.min_quantity}
                        defaultValue={cartItem.quantity}
                        productId={cartItem.product.id}
                        unit={cartItem.product.unit}
                        cartItemId={cartItem.id}
                    />
                </QuantityInputWrapper>
                <ItemActions>
                    <StyledCloseIcon
                        type="button"
                        onClick={onRemoveClick}
                        aria-label={`Удалить из корзины: ${cartItem.product.title}`}
                    >
                        <DeleteOutlineIcon />
                    </StyledCloseIcon>
                    {!cartItem.product.is_negotiable_price && (
                        <ItemPrice>
                            <TotalPrice>{formatProductPrice(cartItem.product, cartItem.quantity)}</TotalPrice>
                        </ItemPrice>
                    )}
                </ItemActions>
            </ItemMain>
        </Wrapper>
    );
};

export default CartItem;
