import { ICartItem } from '../../models/CartItem';
import { IProduct } from '../../models/Product';

export interface IState {
    cartItems: IExtendedCartItem[];
    totalSum: number;
    deliveryCost: number;
    rawCartItems: ICartItem[];
    rawCartItemsByProductId: { [productId: string]: ICartItem };
    refetchCartItems: object;
    totalSumWithDelivery: number;
}

export interface IExtendedCartItem {
    id?: number;
    product: IProduct;
    quantity: number;
}
