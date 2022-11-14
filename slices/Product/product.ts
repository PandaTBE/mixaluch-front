import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppState } from './../../store';
import { HYDRATE } from 'next-redux-wrapper';
import { IProduct } from '../../models/Product';
import { IState } from './interfaces';

const initialState: IState = {
    products: null,
    popularProducts: null,
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
    },

    /**
     * Гидрация необходимо для коннекта стора сервера и стора клиента
     */
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                popularProducts: action.payload.product.popularProducts,
            };
        },
    },
});

export const { storeProducts, storePopularProducts } = product.actions;

export const productReducerValues = (state: AppState) => state.product;

export default product.reducer;
