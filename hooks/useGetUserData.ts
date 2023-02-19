import {
    storeAuthToken,
    storeUser,
    toggleUserFetching,
    toggleUserFetchingError,
    userReducerValues,
} from '../slices/User/user';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { userApi } from '../services/UserService';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../constants/constants';

/**
 * Кастомный хук для получения данных
 */
const useGetUserData = () => {
    const { authToken, user } = useSelector(userReducerValues);
    const [getUserInfo, { data, isError, isLoading }] = userApi.useGetUserInfoMutation();
    const dispatch = useDispatch();

    /** Запись информации о пользователе */
    useEffect(() => {
        if (data) {
            dispatch(storeUser(data));
        }
    }, [data]);

    /** Запись флага ошибки */
    useEffect(() => {
        dispatch(toggleUserFetchingError(isError));
        if (isError) {
            dispatch(storeUser(null));
            dispatch(storeAuthToken(null));
            localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, '');
        }
    }, [isError]);

    /** изменение флага загрузки */
    useEffect(() => {
        dispatch(toggleUserFetching(isLoading));
    }, [isLoading]);

    /** Получение информации о пользователе */
    useEffect(() => {
        if (authToken && !user) {
            getUserInfo(authToken);
        }
    }, [authToken, user]);
};

export default useGetUserData;
