import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from '../../store';
import { IState } from './interfaces';

const initialState: IState = {
    selectedOrder: null,
};

const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        /**
         * Запись выбранного заказа
         */
        storeSelectedOrder: (state, action) => {
            state.selectedOrder = action.payload;
        },
    },
    /**
     * Гидрация необходимо для коннекта стора сервера и стора клиента
     */
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                selectedOrder: action.payload.order.selectedOrder,
            };
        },
    },
});

export const { storeSelectedOrder } = order.actions;

export const orderReducerValues = (state: AppState) => state.order;

export default order.reducer;
