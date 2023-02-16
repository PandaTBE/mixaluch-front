import { storeAuthToken } from '../slices/User/user';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY, LAST_ORDER_ID_LOCAL_STORAGE_KEY } from '../constants/constants';
import { storeLastOrderId } from '../slices/Order/order';

/**
 * Кастомный хук для подготовки данных
 */
const usePrepareData = () => {
    const dispatch = useDispatch();

    /** Получение данных из локал стореджа */
    useEffect(() => {
        const authTokenFromLocalStorage = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);
        const lastOrderId = localStorage.getItem(LAST_ORDER_ID_LOCAL_STORAGE_KEY);

        if (authTokenFromLocalStorage) {
            dispatch(storeAuthToken(authTokenFromLocalStorage));
        }

        if (lastOrderId) {
            dispatch(storeLastOrderId(Number(lastOrderId)));
        }
    }, []);
};

export default usePrepareData;
