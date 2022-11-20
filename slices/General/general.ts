import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../store';
import { IState, TPageToSwitch } from './interfaces';

const initialState: IState = {
    pageToSwitch: '/',
};

const general = createSlice({
    name: 'general',
    initialState,
    reducers: {
        /**
         * Сохранение страницы на которую осуществляется переход
         */
        storePageToSwitch: (state, action: PayloadAction<TPageToSwitch>) => {
            state.pageToSwitch = action.payload;
        },
    },
});

export const { storePageToSwitch } = general.actions;

export const generalReducerValues = (state: AppState) => state.general;

export default general.reducer;
