import { createContext } from 'react';
import { IUser } from '../../../models/User';

interface IContext {
    user: IUser | null;
}

export const OrderingPageContext = createContext<null | IContext>(null);
