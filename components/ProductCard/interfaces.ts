import { IProduct } from '../../models/Product';

export interface IProps {
    /** данные товара */
    product: IProduct;
    /** высота картинки*/
    imageHeight?: string;
}
