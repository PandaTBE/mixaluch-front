import { AppState } from './../../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategoriesByParentId, IState } from './interfaces';

const initialState: IState = {
    categoriesByParentId: null,
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
    },
});

export const { storeCategoriesByParentId } = catalog.actions;

export const catalogState = (state: AppState) => state.catalog;

export default catalog.reducer;
