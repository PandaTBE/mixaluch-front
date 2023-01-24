import { IExtendedCartItem } from '../slices/Cart/interfaces';

export interface OrderData {
    products: IExtendedCartItem[];
}

export interface IOrder {
    delivery_type: TOrderDeliveryType;
    payment_type: TOrderPaymentType;
    status: TOrderStatusType;
    total_sum_with_delivery: number;
    created_at: string;
    updated_at: string;
    order_data: OrderData;
    delivery_cost: number;
    phone_number: string;
    comment: string;
    address: string;
    total_sum: number;
    name: string;
    id: number;
}

export interface IOrderDTO {
    delivery_type: TOrderDeliveryType;
    payment_type: TOrderPaymentType;
    status?: TOrderStatusType;
    total_sum_with_delivery: number;
    order_data: OrderData;
    delivery_cost: number;
    phone_number: string;
    comment?: string;
    address: string;
    total_sum: number;
    name: string;
}

export type TOrderStatusType = 'IN_PROCESS' | 'ACCEPTED' | 'COLLECTED' | 'IN_DELIVERY' | 'COMPLETED';

export type TOrderDeliveryType = 'SELF_DELIVERY' | 'COURIER_DELIVERY';

export type TOrderPaymentType = 'CASH_PAYMENT' | 'CARD_PAYMENT';
