import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppState } from '../../store';
import { IState } from './interfaces';

const initialState: IState = {
    authToken: null,
    user: null,
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
    },
});

export const { storeAuthToken } = user.actions;

export const userReducerValues = (state: AppState) => state.user;

export default user.reducer;
