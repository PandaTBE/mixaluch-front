import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IState, TProductsByStoreId } from './interfaces';
import { IEvotorProduct, IEvotorStore } from '../../models/Evotor';
import { AppState } from '../../store';

const initialState: IState = {
    stores: [],
    storesById: null,
    productsByStoreId: null,
    productsByStoreIdByProductId: null,
};

export const evotor = createSlice({
    name: 'evotor',
    initialState,
    reducers: {
        /**
         * Сохранение всех магазинов из Evotor
         */
        storeStores: (state, action: PayloadAction<IEvotorStore[]>) => {
            const storesById = action.payload.reduce((acc, value) => {
                acc[value.uuid] = value;
                return acc;
            }, {} as { [storeId: string]: IEvotorStore });

            state.stores = action.payload;
            state.storesById = storesById;
        },
        /**
         * Сохранение всех товаров по ключу id магазина
         */
        storeProductsByStoreId: (state, action: PayloadAction<TProductsByStoreId>) => {
            const productsByStoreIdByProductId = Object.entries(action.payload || {}).reduce(
                (acc, [storeId, products]) => {
                    acc[storeId] = {};
                    products.forEach((product) => {
                        acc[storeId][product.uuid] = product;
                    });
                    return acc;
                },
                {} as { [storeId: string]: { [productId: string]: IEvotorProduct } },
            );
            state.productsByStoreId = action.payload;
            state.productsByStoreIdByProductId = productsByStoreIdByProductId;
        },
    },
});

export const { storeProductsByStoreId, storeStores } = evotor.actions;

export const evotorReducerValues = (state: AppState) => state.evotor;

export default evotor.reducer;
