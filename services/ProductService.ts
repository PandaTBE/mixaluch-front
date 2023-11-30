import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { urls } from '../constants/urls';
import {
    IExternalId,
    IExternalIdDTO,
    IProduct,
    IProductDTO,
    IProductImage,
    IProductImageDTO,
    IProductImageUpdateDTO,
} from '../models/Product';
import { AppState } from '../store';

/**
 * API для работы с товарами
 */
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: urls.baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as AppState).user.authToken;

            if (token) {
                headers.set('Authorization', `Token ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (build) => ({
        /** Получение популярных продуктов */
        getPopularProducts: build.mutation({
            query: () => ({
                url: 'products/popular/',
                method: 'GET',
            }),
        }),

        /** Получение товаров */
        getProducts: build.query<IProduct[], void | { queryString?: string }>({
            query: (args) => `products/${typeof args === 'object' && args.queryString ? `?${args.queryString}` : ''}`,
        }),

        /** Получение товара по ID */
        getProductById: build.query<IProduct, number>({
            query: (id) => `products/${id}/`,
        }),

        /**Создание товара */
        createProduct: build.mutation<IProduct, IProductDTO>({
            query: (data) => ({
                url: `products/`,
                method: 'POST',
                body: data,
            }),
        }),

        /** Обновление товара */
        updateProduct: build.mutation<IProduct, { data: Partial<IProduct>; id: number }>({
            query: ({ data, id }) => ({
                url: `products/${id}/`,
                method: 'PATCH',
                body: data,
            }),
        }),

        /** Удаление товара */
        deleteProduct: build.mutation<void, number>({
            query: (id) => ({
                url: `products/${id}/`,
                method: 'DELETE',
            }),
        }),

        /** Создание внешней связки */
        createExternalId: build.mutation<IExternalId, IExternalIdDTO>({
            query: (data) => ({
                url: `products/external-id/`,
                method: 'POST',
                body: data,
            }),
        }),

        /** Удаление внешней связки */
        deleteExternalId: build.mutation<void, number>({
            query: (id) => ({
                url: `products/external-id/${id}/`,
                method: 'DELETE',
            }),
        }),

        /** Обновление внешней связки */
        updateExternalId: build.mutation<IExternalId, { data: Partial<IExternalIdDTO>; id: number }>({
            query: ({ data, id }) => ({
                url: `products/external-id/${id}/`,
                method: 'PATCH',
                body: data,
            }),
        }),

        /** Создание картинки для товара */
        createProductImage: build.mutation<IProductImage, IProductImageDTO>({
            query: (data) => {
                let formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                return {
                    url: `products/image/`,
                    method: 'POST',
                    body: formData,
                    formData: true,
                };
            },
        }),

        /** Редактирование картинки для товара */
        updateProductImage: build.mutation<IProductImage, { data: IProductImageUpdateDTO; id: number }>({
            query: ({ data, id }) => {
                let formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                return {
                    url: `products/image/${id}/`,
                    method: 'PATCH',
                    body: formData,
                    formData: true,
                };
            },
        }),

        /** Удаление картинки для товара */
        deleteProductImage: build.mutation<void, number>({
            query: (id) => {
                return {
                    url: `products/image/${id}/`,
                    method: 'DELETE',
                };
            },
        }),
    }),
});
