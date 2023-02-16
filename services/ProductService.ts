import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { urls } from '../constants/urls';

/**
 * API для работы с товарами
 */
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: urls.baseUrl }),
    endpoints: (build) => ({
        /** Получение популярных продуктов */
        getPopularProducts: build.mutation({
            query: () => ({
                url: 'products/popular/',
                method: 'GET',
            }),
        }),
    }),
});
