import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartReducerValues, storeTotalSum } from '../../../slices/Cart/cart';

/**
 * Касстомный хук для подготовки данных
 */
export const usePrepareData = () => {
    const { cartItems } = useSelector(cartReducerValues);
    const dispatch = useDispatch();

    useEffect(() => {
        if (cartItems.length) {
            const totalSum = cartItems.reduce((acc, value) => {
                return (acc += value.quantity * value.product.regular_price);
            }, 0);

            dispatch(storeTotalSum(totalSum));
        } else {
            dispatch(storeTotalSum(0));
        }
    }, [cartItems]);
};
