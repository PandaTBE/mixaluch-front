import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ILoginDTO } from './../slices/User/interfaces';
import { urls } from '../contsants/urls';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: urls.baseUrl }),
    endpoints: (build) => ({
        login: build.mutation<{ auth_token: string }, ILoginDTO>({
            query: (body) => ({
                url: `auth/token/login/`,
                method: 'POST',
                body,
            }),
        }),
    }),
});
