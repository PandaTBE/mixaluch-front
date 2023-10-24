import { PayloadAction, createSlice } from '@reduxjs/toolkit';
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
});

export const { storeImportantNews } = news.actions;

export const newsReducerValues = (state: AppState) => state.news;

export default news.reducer;
