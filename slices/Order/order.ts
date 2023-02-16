import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { IOrder } from '../../models/Order';
import { AppState } from '../../store';
import { IState } from './interfaces';

const initialState: IState = {
    selectedOrder: null,
    orders: null,
    ordersFetching: false,
    ordersFetchingError: false,
    lastOrderId: null,
};

const order = createSlice({
    name: 'order',
    initialState,
    reducers: {
        /**
         * Запись выбранного заказа
         */
        storeSelectedOrder: (state, action: PayloadAction<null | IOrder>) => {
            state.selectedOrder = action.payload;
        },

        /**
         * Сохранение всех заказов для данного пользователя
         */
        storeOrders: (state, action: PayloadAction<IOrder[] | null>) => {
            state.orders = action.payload;
        },

        /**
         * Изменение флага получения заказов
         */
        toggleOrdersFetching: (state, action: PayloadAction<boolean>) => {
            state.ordersFetching = action.payload;
        },

        /**
         * Изменение флага ошибки при получении заказа
         */
        toggleOrdersFetchingError: (state, action: PayloadAction<boolean>) => {
            state.ordersFetchingError = action.payload;
        },

        /**
         * Запись id последнего заказа
         */
        storeLastOrderId: (state, action: PayloadAction<number | null>) => {
            state.lastOrderId = action.payload;
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

export const { storeLastOrderId, storeSelectedOrder, storeOrders, toggleOrdersFetching, toggleOrdersFetchingError } =
    order.actions;

export const orderReducerValues = (state: AppState) => state.order;

export default order.reducer;
