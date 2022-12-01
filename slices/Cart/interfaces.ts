import { ICartItem } from '../../models/CartItem';
import { IProduct } from '../../models/Product';

export interface IState {
    cartItems: IExtendedCartItem[];
    totalSum: number;
    rawCartItems: ICartItem[];
}

export interface IExtendedCartItem {
    product: IProduct;
    quantity: number;
}
