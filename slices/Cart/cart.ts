import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { ICartItem } from '../../models/CartItem';
import { IState } from './interfaces';

const initialState: IState = {
    cartItems: [],
    totalSum: 0,
};

const cart = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        /**
         * Запись всех товаров в корзине
         */
        storeCartItems: (state, action: PayloadAction<ICartItem[]>) => {
            state.cartItems = action.payload;
        },

        /**
         * Доавление нового товара в корзину
         */
        addCartItem: (state, action: PayloadAction<ICartItem>) => {
            const { cartItems } = cloneDeep(state);
            cartItems.push(action.payload);
            state.cartItems = cartItems;
        },

        /**
         * Удаление товара из карзины
         */
        deleteCartItem: (state, action: PayloadAction<number>) => {
            const { cartItems } = cloneDeep(state);
            const result = cartItems.filter((cartItem) => cartItem.id !== action.payload);
            state.cartItems = result;
        },

        /**
         * Запись итоговой суммы карзины
         */
        storeTotalSum: (state, action: PayloadAction<number>) => {
            state.totalSum = action.payload;
        },
    },
});

export const { storeCartItems, addCartItem, deleteCartItem, storeTotalSum } = cart.actions;

export default cart.reducer;
