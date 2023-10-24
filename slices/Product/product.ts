import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppState } from './../../store';
import { IProduct } from '../../models/Product';
import { IState } from './interfaces';

const initialState: IState = {
    products: null,
    popularProducts: null,
    selectedProduct: null,
};

export const product = createSlice({
    name: 'product',
    initialState,
    reducers: {
        /**
         * Сохранение всех продуктов
         */
        storeProducts: (state, action: PayloadAction<IProduct[] | null>) => {
            state.products = action.payload;
        },

        /**
         * Сохранение популярных продуктов
         */
        storePopularProducts: (state, action: PayloadAction<IProduct[] | null>) => {
            state.popularProducts = action.payload;
        },

        /**
         * Сохранение информации о выбранном товаре
         */
        storeSelectedProduct: (state, action: PayloadAction<null | IProduct>) => {
            state.selectedProduct = action.payload;
        },
    },
});

export const { storeProducts, storePopularProducts, storeSelectedProduct } = product.actions;

export const productReducerValues = (state: AppState) => state.product;

export default product.reducer;
