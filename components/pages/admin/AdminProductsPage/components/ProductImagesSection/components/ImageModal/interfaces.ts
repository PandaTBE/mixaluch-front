import { IProductImage } from '../../../../../../../../models/Product';

export interface IProps {
    toggleEditImageOpen: (image: IProductImage | null) => void;
    modalState: IImageModalState;
}

export interface IImageModalState {
    open: boolean;
    image: IProductImage | null;
    productId: number;
}
