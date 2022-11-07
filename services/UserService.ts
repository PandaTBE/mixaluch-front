import { IUser, IUserLoginDTO } from '../models/User';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
        getUserInfo: build.mutation<IUser, string>({
            query: (authToken) => ({
                url: 'auth/users/me/',
                method: 'GET',
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            }),
        }),
    }),
});
