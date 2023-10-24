import cart from './slices/Cart/cart';
import catalog from './slices/Catalog/catalog';
import category from './slices/Category/category';
import general from './slices/General/general';
import order from './slices/Order/order';
import product from './slices/Product/product';
import user from './slices/User/user';
import news from './slices/News/news';
import { AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { cartApi } from './services/CartService';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { orderApi } from './services/OrderService';
import { userApi } from './services/UserService';
import { newsApi } from './services/NewsService';
import { telegramApi } from './services/TelegramService';
import { productApi } from './services/ProductService';
import { cloneDeep, difference } from 'lodash';

const combinedReducer = combineReducers({
    [telegramApi.reducerPath]: telegramApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    category,
    product,
    catalog,
    general,
    order,
    user,
    cart,
    news,
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const {
            category: { categories, mainCategories, categoriesById },
            product: { popularProducts, products, selectedProduct },
            order: { selectedOrder },
            news: { importantNews },
        } = action.payload as ReturnType<typeof combinedReducer>;
        const stateCopy = cloneDeep(state);

        const nextState = {
            ...stateCopy,
            category: {
                ...stateCopy.category,
                categories: categories?.length ? categories : stateCopy.category.categories,
                mainCategories: mainCategories?.length ? mainCategories : stateCopy.category.mainCategories,
                categoriesById: Object.keys(categoriesById || {})?.length
                    ? categoriesById
                    : stateCopy.category.categoriesById,
            },
            news: {
                ...stateCopy.news,
                importantNews: importantNews?.length ? importantNews : stateCopy.news.importantNews,
            },
            order: {
                ...stateCopy.order,
                selectedOrder: selectedOrder || stateCopy.order.selectedOrder,
            },
            product: {
                ...stateCopy.product,
                popularProducts: popularProducts?.length ? popularProducts : stateCopy.product.popularProducts,
                products: products?.length ? products : stateCopy.product.products,
                selectedProduct: selectedProduct || stateCopy.product.selectedProduct,
            },
        };

        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

const makeStore = () =>
    configureStore({
        reducer: reducer as typeof combinedReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware()
                .concat(telegramApi.middleware)
                .concat(productApi.middleware)
                .concat(orderApi.middleware)
                .concat(userApi.middleware)
                .concat(cartApi.middleware)
                .concat(newsApi.middleware);
        },
        devTools: true,
    });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore);
