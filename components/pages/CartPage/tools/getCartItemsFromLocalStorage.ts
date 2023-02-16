import { CART_ITEMS_LOCAL_STORAGE_KEY } from '../../../../constants/constants';
import { IExtendedCartItem } from '../../../../slices/Cart/interfaces';

/**
 * Функция для получения товара из LocalStorage
 */
const getCartItemsFromLocalStorage = (): IExtendedCartItem[] => {
    const cartItemsFromLocalStorage = localStorage.getItem(CART_ITEMS_LOCAL_STORAGE_KEY);
    if (cartItemsFromLocalStorage) {
        try {
            const parsedData = JSON.parse(cartItemsFromLocalStorage);
            return parsedData;
        } catch (error) {
            console.log('cart items from localStorage parse error >>>>  ', error);
        }
    }

    return [];
};

export default getCartItemsFromLocalStorage;
