import { IProduct } from '../../models/Product';

export interface IState {
    products: IProduct[] | null;
    popularProducts: IProduct[] | null;
    selectedProduct: IProduct | null;
}
