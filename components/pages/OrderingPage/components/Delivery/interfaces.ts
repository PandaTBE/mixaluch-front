import { DateTime } from 'luxon';

export interface IOrderFormValues {
    name: string;
    phone_number: string;
    courierDelivery: boolean;
    selfDelivery: boolean;
    cashPayment: boolean;
    cardPayment: boolean;
    address: string;
    comment: string;
    deliverByTime: boolean;
    deliveryDate: DateTime;
    deliveryTime: DateTime;
}
