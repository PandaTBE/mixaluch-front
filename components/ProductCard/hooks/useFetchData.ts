import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../../../models/Product';
import { cartApi } from '../../../services/CartService';
import { addCartItem, storeCartItemsRefetchObject } from '../../../slices/Cart/cart';
import { userReducerValues } from '../../../slices/User/user';

/**
 * Кастомный хук для работы с сервером
 */
const useFetchData = () => {
    const [addCartItemRequest, data] = cartApi.useAddCartItemMutation();
    const { authToken, user } = useSelector(userReducerValues);
    const dispatch = useDispatch();

    /** Перезапрос товаров */
    useEffect(() => {
        if (data.data || data.error) {
            dispatch(storeCartItemsRefetchObject());
        }
    }, [data]);

    /** Функция для добавления товара в коризну */
    const addCartItemHandler = useCallback(
        (product: IProduct) => {
            if (authToken && user) {
                addCartItemRequest({ authToken, body: { quantity: 1, product: product.id } });
            }

            dispatch(
                addCartItem({
                    product,
                    quantity: 1,
                }),
            );
        },
        [authToken, user],
    );

    return { addCartItem: addCartItemHandler };
};

export default useFetchData;
