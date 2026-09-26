import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../../../services/CartService';
import { deleteCartItem, storeCartItemsRefetchObject } from '../../../slices/Cart/cart';
import { userReducerValues } from '../../../slices/User/user';

/**
 * Кастомный хук для работы с сервером
 */
const useFetchData = () => {
    const [patchCartItem, data] = cartApi.usePatchCartItemMutation();
    const [removeCartItem, removeData] = cartApi.useRemoveCartItemMutation();
    const { authToken, user } = useSelector(userReducerValues);
    const dispatch = useDispatch();

    /** Перезапрос товаров */
    useEffect(() => {
        if (data.error || removeData.error) {
            dispatch(storeCartItemsRefetchObject());
        }
    }, [data.error, removeData.error, dispatch]);

    /** Обновление товара в корзине */
    const patchCartItemHandler = useCallback(
        (quantity: number, cartItemId?: number) => {
            if (authToken && cartItemId && user) {
                patchCartItem({ authToken, cartItemId, body: { quantity } });
            }
        },
        [authToken, user],
    );

    const deleteCartItemHandler = useCallback(
        (productId: number, cartItemId?: number) => {
            if (authToken && cartItemId && user) {
                removeCartItem({ authToken, cartItemId });
            }
            dispatch(deleteCartItem(productId));
        },
        [authToken, user, removeCartItem, dispatch],
    );

    return {
        patchCartItem: patchCartItemHandler,
        deleteCartItem: deleteCartItemHandler,
    };
};

export default useFetchData;
