import { ICartItem } from './../models/CartItem';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urls } from '../constants/urls';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: urls.baseUrl }),
    endpoints: (build) => ({
        /** Получение корзины пользователя */
        getCartItems: build.mutation<ICartItem[], string>({
            query: (authToken) => ({
                url: `cart/`,
                method: 'GET',
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            }),
        }),
        /** Удаление товара из корзины */
        removeCartItem: build.mutation<ICartItem[], { authToken: string; cartItemId: number }>({
            query: (data) => ({
                url: `cart-item/${data.cartItemId}/`,
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${data.authToken}`,
                },
            }),
        }),
        /** Добавление товара в коризну */
        addCartItem: build.mutation<ICartItem[], { authToken: string; body: { quantity: number; product: number } }>({
            query: (data) => ({
                url: `cart/`,
                method: 'POST',
                headers: {
                    Authorization: `Token ${data.authToken}`,
                },
                body: data.body,
            }),
        }),
        /** Изменение товара в коризне */
        patchCartItem: build.mutation<
            ICartItem[],
            { authToken: string; cartItemId: number; body: { quantity: number } }
        >({
            query: (data) => ({
                url: `cart-item/${data.cartItemId}/`,
                method: 'PATCH',
                headers: {
                    Authorization: `Token ${data.authToken}`,
                },
                body: data.body,
            }),
        }),
    }),
});
