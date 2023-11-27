import { IProduct } from '../../../models/Product';

export interface ITableColumnProps {
    product: IProduct;
}

export type TOrder = 'asc' | 'desc';
