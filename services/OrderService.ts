import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOrder, IOrderDTO } from '../models/Order';
import { urls } from '../constants/urls';

export interface IOrderingSettings {
    notice: string;
    self_delivery_enabled: boolean;
    courier_delivery_enabled: boolean;
}

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: urls.baseUrl }),
    endpoints: (build) => ({
        getOrderingSettings: build.query<IOrderingSettings, void>({
            query: () => 'ordering-settings/',
        }),
        /** Создание (оформление) заказа*/
        createOrder: build.mutation<IOrder, { authToken: string | null; body: IOrderDTO }>({
            query: (data) => ({
                url: 'orders/',
                method: 'POST',
                body: data.body,
                headers: data.authToken ? { Authorization: `Token ${data.authToken}` } : {},
            }),
        }),

        /** Получение информации о конкретном заказе */
        getOrderInfo: build.query<IOrder, number | undefined>({
            query: (id) => {
                if (id) {
                    return {
                        url: `order-info/${id}/`,
                        method: 'GET',
                    };
                }

                throw new Error('ID is required.');
            },
        }),

        /** Получение всех заказв (истории заказов) для данного пользователя*/
        getOrders: build.mutation<IOrder[], string>({
            query: (authToken) => ({
                url: 'orders/',
                method: 'GET',
                headers: { Authorization: `Token ${authToken}` },
            }),
        }),
    }),
});
