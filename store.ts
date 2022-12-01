import user from './slices/User/user';
import catalog from './slices/Catalog/catalog';
import { createWrapper } from 'next-redux-wrapper';
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import category from './slices/Category/category';
import product from './slices/Product/product';
import { userApi } from './services/UserService';
import general from './slices/General/general';
import cart from './slices/Cart/cart';
import { cartApi } from './services/CartService';

const makeStore = () =>
    configureStore({
        reducer: {
            [userApi.reducerPath]: userApi.reducer,
            [cartApi.reducerPath]: cartApi.reducer,
            category,
            product,
            catalog,
            user,
            general,
            cart,
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(userApi.middleware);
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
