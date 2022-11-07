import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IUserLoginDTO } from '../models/User';
import { urls } from '../contsants/urls';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: urls.baseUrl }),
    endpoints: (build) => ({
        login: build.mutation<{ auth_token: string }, IUserLoginDTO>({
            query: (body) => ({
                url: `auth/token/login/`,
                method: 'POST',
                body,
            }),
        }),
    }),
});
