import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppState } from '../../store';
import { IState } from './interfaces';
import { IUser } from './../../models/User';

const initialState: IState = {
    authToken: null,
    user: null,
    userFetching: false,
    userFetchingError: false,
};

export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * Сохранение токена авторизции для юзера
         */
        storeAuthToken: (state, action: PayloadAction<string | null>) => {
            state.authToken = action.payload;
        },

        /**
         * Сохранение информации о пользователе
         */
        storeUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },

        /**
         * Изменение флага загрузки пользователя
         */
        toggleUserFetching: (state, action: PayloadAction<boolean>) => {
            state.userFetching = action.payload;
        },

        /**
         * Изменение флага ошибки при получении пользователя
         */
        toggleUserFetchingError: (state, action: PayloadAction<boolean>) => {
            state.userFetchingError = action.payload;
        },
    },
});

export const { storeAuthToken, storeUser, toggleUserFetchingError, toggleUserFetching } = user.actions;

export const userReducerValues = (state: AppState) => state.user;

export default user.reducer;
