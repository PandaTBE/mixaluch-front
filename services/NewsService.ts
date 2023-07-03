import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { urls } from '../constants/urls';
import { INews } from '../models/News';

/**
 * API для работы с товарами
 */
export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl: urls.baseUrl }),
    endpoints: (build) => ({
        /** Получение популярных продуктов */
        getImportantNews: build.query<INews[], void>({
            query: () => ({
                url: 'important-news/',
                method: 'GET',
            }),
        }),
    }),
});
