import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { userReducerValues } from '../../../../slices/User/user';
import { AUTH_TOKEN_LOCAL_STORAGE_KEY } from '../../../../constants/constants';

/**
 * кастомный хук для работы с даными
 */
const useData = () => {
    const { authToken } = useSelector(userReducerValues);
    const router = useRouter();

    /** Запись токена в локал сторедж и редирект на страницу авторизованного пользователя */
    useEffect(() => {
        if (authToken) {
            const tokenFromLocalStorage = localStorage.getItem(AUTH_TOKEN_LOCAL_STORAGE_KEY);

            if (tokenFromLocalStorage !== authToken) {
                localStorage.setItem(AUTH_TOKEN_LOCAL_STORAGE_KEY, authToken);
            }
            router.push('/user-account');
        }
    }, [authToken]);
};

export default useData;
