import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../../../services/CartService';
import { storeCartItemsRefetchObject, updateCartItem } from '../../../slices/Cart/cart';
import { userReducerValues } from '../../../slices/User/user';

/**
 * Кастомный хук для работы с данными
 */
const useFetchData = () => {
    const [patchCartItem, data] = cartApi.usePatchCartItemMutation();
    const { authToken } = useSelector(userReducerValues);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.error) {
            dispatch(storeCartItemsRefetchObject());
        }
    }, [data.error]);

    const patchCartItemHandler = useCallback(
        (productId: number, quantity: number, cartItemId?: number) => {
            if (authToken && cartItemId) {
                patchCartItem({ authToken, cartItemId, body: { quantity } });
            }
            dispatch(updateCartItem({ productId, quantity }));
        },
        [authToken],
    );

    return {
        patchCartItem: patchCartItemHandler,
    };
};

export default useFetchData;
