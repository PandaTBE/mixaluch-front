import { IEvotorProduct, IEvotorStore } from '../../models/Evotor';

export interface IState {
    stores: IEvotorStore[];
    storesById: TStoresById;
    productsByStoreId: TProductsByStoreId;
    productsByStoreIdByProductId: TProductsByStoreIdByProductId;
}

export type TProductsByStoreId = null | { [storeId: string]: IEvotorProduct[] };
export type TProductsByStoreIdByProductId = null | { [storeId: string]: { [productId: string]: IEvotorProduct } };
export type TStoresById = null | { [storeId: string]: IEvotorStore };
