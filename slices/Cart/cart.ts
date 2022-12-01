import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { ICartItem } from '../../models/CartItem';
import { IProduct } from '../../models/Product';
import { AppState } from '../../store';
import { IExtendedCartItem, IState } from './interfaces';

const initialState: IState = {
    rawCartItems: [],
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
        storeCartItems: (state, action: PayloadAction<IExtendedCartItem[]>) => {
            state.cartItems = action.payload;
        },

        /**
         * Доавление нового товара в корзину
         */
        addCartItem: (state, action: PayloadAction<IExtendedCartItem>) => {
            const { cartItems } = cloneDeep(state);
            cartItems.push(action.payload);
            state.cartItems = cartItems;
        },

        /**
         * Удаление товара из карзины
         */
        deleteCartItem: (state, action: PayloadAction<number>) => {
            const { cartItems } = cloneDeep(state);
            const result = cartItems.filter((cartItem) => cartItem.product.id !== action.payload);
            state.cartItems = result;
        },

        /**
         * Изменение количества товара в корзине
         */
        updateCartItem: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
            const { cartItems } = cloneDeep(state);

            const currentProdcut = cartItems.find((cartItem) => cartItem.product.id === action.payload.productId);

            if (currentProdcut) {
                currentProdcut.quantity = action.payload.quantity;
                const result = cartItems.filter((cartItem) => cartItem.product.id !== action.payload.productId);
                result.push(currentProdcut);
                state.cartItems = result;
            }
        },

        /**
         * Сохранение сырых данных для корзины
         */
        storeRawCartItems: (state, action: PayloadAction<ICartItem[]>) => {
            state.rawCartItems = action.payload;
        },

        /**
         * Запись итоговой суммы карзины
         */
        storeTotalSum: (state, action: PayloadAction<number>) => {
            state.totalSum = action.payload;
        },
    },
});

export const { storeCartItems, addCartItem, deleteCartItem, storeTotalSum, updateCartItem, storeRawCartItems } =
    cart.actions;

export const cartReducerValues = (state: AppState) => state.cart;

export default cart.reducer;
