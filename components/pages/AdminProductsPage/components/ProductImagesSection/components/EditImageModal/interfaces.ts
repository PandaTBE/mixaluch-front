import { IProductImage } from '../../../../../models/Product';

export interface IProps {
    toggleEditImageOpen: (image: IProductImage | null) => () => void;
    modalState: IEditImageModalState;
}

export interface IEditImageModalState {
    open: boolean;
    image: IProductImage | null;
}
