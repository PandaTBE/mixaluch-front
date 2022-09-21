import { HYDRATE } from 'next-redux-wrapper';
import { AppState } from './../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, IState } from './interfaces';

const initialState: IState = {
    categories: null,
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
    },

    extraReducers: {
        /**
         * Гидрация необходимо для коннекта стора сервера и стора клиента
         */
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                categories: action.payload.category.categories,
            };
        },
    },
});

export const { storeCategories } = category.actions;

export const categoryState = (state: AppState) => state.category;

export default category.reducer;
