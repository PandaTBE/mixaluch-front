import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../../../models/Product';
import { cartApi } from '../../../services/CartService';
import { addCartItem, storeCartItemsRefetchObject } from '../../../slices/Cart/cart';
import { userReducerValues } from '../../../slices/User/user';

const useFetchData = () => {
    const [addCartItemRequest, data] = cartApi.useAddCartItemMutation();
    const { authToken } = useSelector(userReducerValues);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.data || data.error) {
            dispatch(storeCartItemsRefetchObject());
        }
    }, [data]);

    const addCartItemHandler = useCallback(
        (product: IProduct) => {
            if (authToken) {
                addCartItemRequest({ authToken, body: { quantity: 1, product: product.id } });
            }

            dispatch(
                addCartItem({
                    product,
                    quantity: 1,
                }),
            );
        },
        [authToken],
    );

    return { addCartItem: addCartItemHandler };
};

export default useFetchData;
