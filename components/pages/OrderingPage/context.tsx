import { createContext } from 'react';
import { IUser } from '../../../models/User';

interface IContext {
    totalSum: number;
    user: IUser | null;
    storeDeliveryCostTrans: (value: number) => void;
}

export const OrderingPageContext = createContext<null | IContext>(null);
