import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CART_ITEMS_LOCAL_STORAGE_KEY } from '../../../../constants/constants';
import { cartReducerValues, storeCartItems } from '../../../../slices/Cart/cart';
import { userReducerValues } from '../../../../slices/User/user';
import getCartItemsFromLocalStorage from '../tools/getCartItemsFromLocalStorage';
import { productApi } from '../../../../services/ProductService';

/**
 * Кастомный хук для работы с localStorage
 */
export const useLocalStorage = () => {
    const [productsSearchString, setProductsSearchString] = useState('');
    const [isCartItemsLoaded, setIsCartItemsLoaded] = useState(false);

    const { data } = productApi.useGetProductsQuery(
        { queryString: productsSearchString },
        { skip: !productsSearchString },
    );

    const { cartItems } = useSelector(cartReducerValues);
    const { authToken } = useSelector(userReducerValues);

    const dispatch = useDispatch();

    /**
     * Обновление LocalStorage
     */
    useEffect(() => {
        if (!authToken && isCartItemsLoaded) {
            const cartItemsForLocalStorage = JSON.stringify(cartItems);
            localStorage.setItem(CART_ITEMS_LOCAL_STORAGE_KEY, cartItemsForLocalStorage);
        }
    }, [cartItems, authToken, isCartItemsLoaded]);

    /**
     * Обновление цен, для товаров из localStorage
     */
    useEffect(() => {
        if (data && cartItems.length) {
            const updatedCartItems = cartItems.map((cartItem) => {
                const product = data.find((product) => product.id === cartItem.product.id);
                return { ...cartItem, product: product || cartItem.product };
            });
            dispatch(storeCartItems(updatedCartItems));
        }
    }, [data]);

    /**
     * Получение данных из локал стореджа
     */
    useEffect(() => {
        const cartItemsFromLocalStorage = getCartItemsFromLocalStorage();
        if (cartItemsFromLocalStorage.length) {
            const productsSearchString = cartItemsFromLocalStorage.reduce((acc, value) => {
                if (value.product.id) {
                    acc += `${value.product.id},`;
                }
                return acc;
            }, '');

            if (productsSearchString) {
                setProductsSearchString(`id=${productsSearchString}`);
            }
        }
        dispatch(storeCartItems(cartItemsFromLocalStorage));
        setIsCartItemsLoaded(true);
    }, []);
};
