import { ICartItem } from './../models/CartItem';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urls } from '../contsants/urls';

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
                url: `cart-item/${data.cartItemId}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Token ${data.authToken}`,
                },
            }),
        }),
    }),
});
