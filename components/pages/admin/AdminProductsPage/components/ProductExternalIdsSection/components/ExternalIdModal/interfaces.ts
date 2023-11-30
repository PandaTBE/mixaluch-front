import { IEvotorProduct } from '../../../../../../../../models/Evotor';
import { IExternalId, IProduct } from '../../../../../../../../models/Product';

export interface IProps {
    isOpen: boolean;
    toggleOpen: () => void;
    product: IProduct;
    externalId?: IExternalId;
}

export type TExtendedEvotorProduct = IEvotorProduct & { storeId: string };
