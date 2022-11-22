import { IProduct } from './Product';

export interface ICartItem {
    id: number;
    total_price: number;
    product: IProduct;
    quantity: number;
}
