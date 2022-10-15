import user from './slices/User/user';
import catalog from './slices/Catalog/catalog';
import { createWrapper } from 'next-redux-wrapper';
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import category from './slices/Category/category';
import product from './slices/Product/product';

const makeStore = () =>
    configureStore({
        reducer: {
            category,
            product,
            catalog,
            user,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
