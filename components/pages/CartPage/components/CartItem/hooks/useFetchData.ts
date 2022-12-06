import { userReducerValues } from './../../../../../../slices/User/user';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartApi } from '../../../../../../services/CartService';
import { deleteCartItem, storeCartItemsRefetchObject } from '../../../../../../slices/Cart/cart';

const useFecthData = () => {
    const { authToken } = useSelector(userReducerValues);
    const [deleteCartItemRequest, data] = cartApi.useRemoveCartItemMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.error) {
            dispatch(storeCartItemsRefetchObject());
        }
    }, [data.error]);

    const deleteHandler = useCallback(
        (productId: number, cartItemId?: number) => {
            if (authToken && cartItemId) {
                deleteCartItemRequest({ authToken, cartItemId });
            }

            dispatch(deleteCartItem(productId));
        },
        [authToken],
    );

    return { deleteCartItem: deleteHandler };
};

export default useFecthData;
