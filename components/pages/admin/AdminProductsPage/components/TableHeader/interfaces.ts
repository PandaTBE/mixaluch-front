import { IProduct } from '../../../../../../models/Product';
import { TOrder } from '../../interfaces';

export interface IProps {
    order: TOrder;
    orderBy: keyof IProduct;
    onHeaderCellClick: (key: keyof IProduct | null) => () => void;
}
