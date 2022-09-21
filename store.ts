import catalog from './slices/Catalog/catalog';
import { createWrapper } from 'next-redux-wrapper';
import { configureStore } from '@reduxjs/toolkit';
import category from './slices/Category/category';
import product from './slices/Product/product';

const makeStore = () =>
    configureStore({
        reducer: {
            category,
            product,
            catalog,
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
