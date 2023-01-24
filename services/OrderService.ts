import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urls } from '../contsants/urls';
import { IOrder, IOrderDTO } from '../models/Order';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: urls.baseUrl }),
    endpoints: (build) => ({
        /** Создание (оформление) заказа*/
        createOrder: build.mutation<IOrder, { authToken: string | null; body: IOrderDTO }>({
            query: (data) => ({
                url: 'orders/',
                method: 'POST',
                body: data.body,
                headers: data.authToken ? { Authorization: `Token ${data.authToken}` } : {},
            }),
        }),
    }),
});
