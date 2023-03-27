import { createContext } from 'react';
import { IUser } from '../../../models/User';
import { IExtendedCartItem } from '../../../slices/Cart/interfaces';
import { IOrderFormValues } from './components/Delivery/interfaces';

interface IContext {
    cartItems: IExtendedCartItem[];
    createOrderFetching: boolean;
    totalSumWithDelivery: number;
    deliveryCost: number;
    user: IUser | null;
    totalSum: number;
    storeDeliveryCostTrans: (value: number) => void;
    createOrderTrans: (formValues: IOrderFormValues) => void;
}

export const OrderingPageContext = createContext<null | IContext>(null);
