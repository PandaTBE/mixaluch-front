import { AppState } from './../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoriesByParentId, IState } from './interfaces';

const initialState: IState = {
    categoriesByParentId: null,
    selectedCategoryId: null,
};

export const catalog = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        /**
         * Сохранение категорий, где ключ это ID родительской категории
         */
        storeCategoriesByParentId: (state, action: PayloadAction<null | ICategoriesByParentId>) => {
            state.categoriesByParentId = action.payload;
        },

        /**
         * Сохранение выбранной категории
         */
        storeSelectedCategoryId: (state, action: PayloadAction<number | null>) => {
            state.selectedCategoryId = action.payload;
        },
    },
});

export const { storeCategoriesByParentId, storeSelectedCategoryId } = catalog.actions;

export const catalogReducerValues = (state: AppState) => state.catalog;

export default catalog.reducer;
