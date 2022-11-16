import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState } from './interfaces';
import { ICategory } from '../../models/Category';

const initialState: IState = {
    categories: null,
    mainCategories: null,
};

export const category = createSlice({
    name: 'category',
    initialState,
    reducers: {
        /**
         * Сохранение всех категорий
         */
        storeCategories: (state, action: PayloadAction<null | ICategory[]>) => {
            state.categories = action.payload;
        },

        /**
         * Сохранение основных (главных категорий)
         */
        storeMainCategories: (state, action: PayloadAction<null | ICategory[]>) => {
            state.mainCategories = action.payload;
        },
    },

    extraReducers: {
        /**
         * Гидрация необходимо для коннекта стора сервера и стора клиента
         */
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                categories: action.payload.category.categories,
                mainCategories: action.payload.category.mainCategories,
            };
        },
    },
});

export const { storeCategories, storeMainCategories } = category.actions;

export const categoryReducerValues = (state: AppState) => state.category;

export default category.reducer;
