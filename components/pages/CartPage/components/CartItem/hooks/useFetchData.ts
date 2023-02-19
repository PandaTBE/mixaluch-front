import { userReducerValues } from './../../../../../../slices/User/user';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../../../../../../services/CartService';
import { deleteCartItem, storeCartItemsRefetchObject } from '../../../../../../slices/Cart/cart';

/**
 * Кастомный хук для работы с сервером
 */
const useFecthData = () => {
    const { authToken, user } = useSelector(userReducerValues);
    const [deleteCartItemRequest, data] = cartApi.useRemoveCartItemMutation();
    const dispatch = useDispatch();

    /** Обновление товаров в корзине при ошибке */
    useEffect(() => {
        if (data.error) {
            dispatch(storeCartItemsRefetchObject());
        }
    }, [data.error]);

    /** Функция для удаления товара */
    const deleteHandler = useCallback(
        (productId: number, cartItemId?: number) => {
            if (authToken && cartItemId && user) {
                deleteCartItemRequest({ authToken, cartItemId });
            }

            dispatch(deleteCartItem(productId));
        },
        [authToken, user],
    );

    return { deleteCartItem: deleteHandler };
};

export default useFecthData;
