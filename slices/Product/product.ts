import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct, IState } from './interfaces';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './../../store';

const initialState: IState = {
    products: null,
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
    },

    /**
     * Гидрация необходимо для коннекта стора сервера и стора клиента
     */
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                products: action.payload.product.products,
            };
        },
    },
});

export const { storeProducts } = product.actions;

export const productState = (state: AppState) => state.product;

export default product.reducer;
