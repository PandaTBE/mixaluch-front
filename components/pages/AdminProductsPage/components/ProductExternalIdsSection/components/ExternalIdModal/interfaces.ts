import { IEvotorProduct } from '../../../../../../../models/Evotor';
import { IExternalId } from '../../../../../../../models/Product';

export interface IProps {
    isOpen: boolean;
    toggleOpen: () => void;
    productId: number;
    externalId?: IExternalId;
}

export type TExtendedEvotorProduct = IEvotorProduct & { storeId: string };
