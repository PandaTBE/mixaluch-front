import { AnyAction, createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthApi } from '../../api/AuthApi';
import { AppThunk } from '../../store';
import { ILoginDTO, IState } from './interfaces';

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

/**
 * Thunk. Авторизация пользователя
 */
export const loginThunk =
    (dto: ILoginDTO): AppThunk =>
    async (dispatch) => {
        try {
            const data = await AuthApi.login(dto);
            dispatch(storeAuthToken(data.auth_token));
        } catch (error) {
            console.log(error);
        }
    };

export const { storeAuthToken } = user.actions;

export default user.reducer;
