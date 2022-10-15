import { ILoginDTO } from '../slices/User/interfaces';
import { instance } from './intex';

/**
 * Объект с методами, которые необходимы для работы с авторизацией
 */
export const AuthApi = {
    /** Авторизация */
    async login(dto: ILoginDTO) {
        const data = await instance.post<{ auth_token: string }>('auth/token/login/', dto).then((res) => res.data);
        return data;
    },
};
