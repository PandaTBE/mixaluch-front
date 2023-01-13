import {
    IUser,
    IUserActivateDTO,
    IUserLoginDTO,
    IUserRegisterDTO,
    IUserResetPasswordConfirmDTO,
    IUserResetPasswordDTO,
} from '../models/User';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { urls } from '../contsants/urls';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: urls.baseUrl }),
    endpoints: (build) => ({
        /** Авторизация пользователя */
        login: build.mutation<{ auth_token: string }, IUserLoginDTO>({
            query: (body) => ({
                url: `auth/token/login/`,
                method: 'POST',
                body,
            }),
        }),
        /** Получение информации о пользователе */
        getUserInfo: build.mutation<IUser, string>({
            query: (authToken) => ({
                url: 'auth/users/me/',
                method: 'GET',
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            }),
        }),
        /** Выход */
        logout: build.mutation<'', string>({
            query: (authToken) => ({
                url: 'auth/token/logout/',
                method: 'POST',
                headers: {
                    Authorization: `Token ${authToken}`,
                },
            }),
        }),
        /** Регистрация */
        register: build.mutation<'', IUserRegisterDTO>({
            query: (body) => ({
                url: 'auth/users/',
                method: 'POST',
                body: body,
            }),
        }),

        /** Активация пользователя (подтверждение почты) */
        activate: build.mutation<'', IUserActivateDTO>({
            query: (body) => ({
                url: 'auth/users/activation/',
                method: 'POST',
                body: body,
            }),
        }),

        /** Сброс пароля */
        resetPassword: build.mutation<'', IUserResetPasswordDTO>({
            query: (body) => ({
                url: 'auth/users/reset_password/',
                method: 'POST',
                body: body,
            }),
        }),

        /** Подтверждение сброса пароля */
        resetPasswordConfirm: build.mutation<'', IUserResetPasswordConfirmDTO>({
            query: (body) => ({
                url: 'auth/users/reset_password_confirm/',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});
