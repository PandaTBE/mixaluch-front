import { IProduct, IProductCard } from '../../models/Product';

export interface IProps {
    /** данные товара */
    product: IProduct | IProductCard;
    /** высота картинки*/
    imageHeight?: string;
}
