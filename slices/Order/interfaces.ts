import { IOrder } from '../../models/Order';

export interface IState {
    selectedOrder: IOrder | null;
}
