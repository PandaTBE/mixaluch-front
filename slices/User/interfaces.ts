import { IUser } from '../../models/User';

export interface IState {
    authToken: null | string;
    user: null | IUser;
}
