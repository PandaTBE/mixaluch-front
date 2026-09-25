import { IProduct } from '../models/Product';

type ProductPrice = Pick<IProduct, 'regular_price' | 'is_negotiable_price'>;

export const getProductPrice = (product: ProductPrice): number =>
    product.is_negotiable_price ? 0 : product.regular_price;

export const formatProductPrice = (product: ProductPrice, quantity?: number): string =>
    product.is_negotiable_price
        ? 'Договорная цена'
        : `${quantity === undefined ? product.regular_price : Math.floor(product.regular_price * quantity)} ₽`;
