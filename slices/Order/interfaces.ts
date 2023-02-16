import { IOrder } from '../../models/Order';

export interface IState {
    selectedOrder: IOrder | null;
    orders: IOrder[] | null;
    ordersFetching: boolean;
    ordersFetchingError: boolean;
    lastOrderId: number | null;
}
