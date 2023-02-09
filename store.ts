import cart from './slices/Cart/cart';
import catalog from './slices/Catalog/catalog';
import category from './slices/Category/category';
import general from './slices/General/general';
import order from './slices/Order/order';
import product from './slices/Product/product';
import user from './slices/User/user';
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { cartApi } from './services/CartService';
import { createWrapper } from 'next-redux-wrapper';
import { orderApi } from './services/OrderService';
import { userApi } from './services/UserService';
import { telegramApi } from './services/TelegramService';

const makeStore = () =>
    configureStore({
        reducer: {
            [telegramApi.reducerPath]: telegramApi.reducer,
            [orderApi.reducerPath]: orderApi.reducer,
            [userApi.reducerPath]: userApi.reducer,
            [cartApi.reducerPath]: cartApi.reducer,
            category,
            product,
            catalog,
            general,
            order,
            user,
            cart,
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
                .concat(telegramApi.middleware)
                .concat(orderApi.middleware)
                .concat(userApi.middleware)
                .concat(cartApi.middleware);
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
