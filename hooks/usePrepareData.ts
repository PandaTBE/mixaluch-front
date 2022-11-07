import { storeAuthToken } from '../slices/User/user';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

/**
 * Кастомный хук для подготовки данных
 */
const usePrepareData = () => {
    const dispatch = useDispatch();

    /** Получение токена из локал стореджа */
    useEffect(() => {
        const authTokenFromLocalStorage = localStorage.getItem('authToken');

        if (authTokenFromLocalStorage) {
            dispatch(storeAuthToken(authTokenFromLocalStorage));
        }
    }, []);
};

export default usePrepareData;
