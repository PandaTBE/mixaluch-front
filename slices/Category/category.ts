import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IState } from './interfaces';
import { ICategory } from '../../models/Category';

const initialState: IState = {
    categories: null,
    categoriesById: null,
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
            let categoriesById = null;

            if (action.payload) {
                categoriesById = action.payload.reduce((acc: { [id: string]: ICategory }, value) => {
                    acc[value.id] = value;
                    return acc;
                }, {});
            }

            state.categories = action.payload;
            state.categoriesById = categoriesById;
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
            let categoriesById: {
                [id: string]: ICategory;
            } | null = null;

            if (action.payload.category.categories) {
                categoriesById = action.payload.category.categories.reduce(
                    (acc: { [id: string]: ICategory }, value: ICategory) => {
                        acc[value.id] = value;
                        return acc;
                    },
                    {},
                );
            }

            return {
                ...state,
                categories: action.payload.category.categories,
                mainCategories: action.payload.category.mainCategories,
                categoriesById: categoriesById,
            };
        },
    },
});

export const { storeCategories, storeMainCategories } = category.actions;

export const categoryReducerValues = (state: AppState) => state.category;

export default category.reducer;
