import { ICartItem } from '../../models/CartItem';

export interface IState {
    cartItems: ICartItem[];
    totalSum: number;
}
