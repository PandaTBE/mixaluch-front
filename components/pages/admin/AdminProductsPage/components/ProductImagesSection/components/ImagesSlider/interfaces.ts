import { IProductImage } from '../../../../../../../../models/Product';

export interface IProps {
    /** Картинки товара */
    images: IProductImage[];
    /** ID товара */
    productId: number;
}
