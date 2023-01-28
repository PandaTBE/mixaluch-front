import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../../../services/CartService';
import { storeCartItemsRefetchObject } from '../../../slices/Cart/cart';
import { userReducerValues } from '../../../slices/User/user';

/**
 * Кастомный хук для работы с сервером
 */
const useFetchData = () => {
    const [patchCartItem, data] = cartApi.usePatchCartItemMutation();
    const { authToken } = useSelector(userReducerValues);
    const dispatch = useDispatch();

    /** Перезапрос товаров */
    useEffect(() => {
        if (data.error) {
            dispatch(storeCartItemsRefetchObject());
        }
    }, [data.error]);

    /** Обновление товара в корзине */
    const patchCartItemHandler = useCallback(
        (quantity: number, cartItemId?: number) => {
            if (authToken && cartItemId) {
                patchCartItem({ authToken, cartItemId, body: { quantity } });
            }
        },
        [authToken],
    );

    return {
        patchCartItem: patchCartItemHandler,
    };
};

export default useFetchData;
