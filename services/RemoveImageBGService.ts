import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urls } from '../constants/urls';

export const removeImageBgApi = createApi({
    reducerPath: 'removeImageBgApi',
    baseQuery: fetchBaseQuery({
        baseUrl: urls.removeImageBgUrl,
        prepareHeaders: (headers) => {
            const token = process.env.NEXT_PUBLIC_BG_REMOVE_API_KEY || '';

            if (token) {
                headers.set('X-Api-Key', token);
            }

            return headers;
        },
    }),
    endpoints: (build) => ({
        /** Удаление фона на картинке */
        removeBg: build.mutation<File, { image_file: File }>({
            query: (data) => {
                const formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    formData.append(key, value);
                });
                formData.append('size', 'auto');
                return {
                    url: `/`,
                    method: 'POST',
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        return new File([blob], data.image_file.name);
                    },
                    body: formData,
                    formData: true,
                };
            },
        }),
    }),
});
