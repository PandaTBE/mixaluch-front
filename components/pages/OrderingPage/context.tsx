import { createContext } from 'react';
import { IUser } from '../../../models/User';
import { IExtendedCartItem } from '../../../slices/Cart/interfaces';

interface IContext {
    cartItems: IExtendedCartItem[];
    totalSumWithDelivery: number;
    deliveryCost: number;
    user: IUser | null;
    totalSum: number;
    storeDeliveryCostTrans: (value: number) => void;
}

export const OrderingPageContext = createContext<null | IContext>(null);
