import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { INews } from '../../models/News';
import { AppState } from '../../store';
import { IState } from './interfaces';

const initialState: IState = {
    importantNews: [],
};

const news = createSlice({
    name: 'news',
    initialState,
    reducers: {
        /**
         * Сохранение важных новостей
         */
        storeImportantNews: (state, action: PayloadAction<INews[]>) => {
            state.importantNews = action.payload;
        },
    },
    /**
     * Гидрация необходимо для коннекта стора сервера и стора клиента
     */
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                importantNews: action.payload.news.importantNews,
            };
        },
    },
});

export const { storeImportantNews } = news.actions;

export const newsReducerValues = (state: AppState) => state.news;

export default news.reducer;
