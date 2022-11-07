import { IUser } from '../../models/User';

export interface IState {
    authToken: null | string;
    user: null | IUser;
    userFetching: boolean;
    userFetchingError: boolean;
}
