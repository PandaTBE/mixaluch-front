import * as yup from 'yup';
import Button from '../../../../Button/Button';
import { DELIVERY_COST, FREE_DELIVERY_BORDER } from '../../../../../slices/Cart/cart';
import { OrderingPageContext } from '../../context';
import { FormGroup, Stack } from '@mui/material';
import { useContext } from 'react';
import { useFormik } from 'formik';
import {
    ButtonWrapper,
    DeliveryCost,
    CheckboxLabel,
    CheckboxSubLabel,
    CheckboxWrapper,
    Form,
    StyledCheckbox,
    StyledTextField,
    Title,
    Wrapper,
    StyledSwitch,
    StyledFormControlLabel,
} from './styles';
import { IOrderFormValues } from './interfaces';
import {
    googleAnalytics4DataLayers,
    sendNewDataLayer,
} from '../../../../../services/GoogleAnalytics4Service/GoogleAnalytics4Service';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';

/**
 * Компонент для отображения секции доставки
 */
const Delivery = () => {
    const phoneRegExp = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/gm;
    const context = useContext(OrderingPageContext);

    const validationSchema = yup.object({
        phone_number: yup
            .string()
            .required('Это обязательное поле')
            .matches(phoneRegExp, 'Некорректный номер телефона'),
        name: yup.string().required('Это обязательное поле'),
        courierDelivery: yup.boolean(),
        address: yup.string().when('courierDelivery', {
            is: true,
            then: yup.string().required('Это обязательное поле'),
        }),
    });

    const onSubmit = (formValues: IOrderFormValues) => {
        context?.createOrderTrans && context.createOrderTrans(formValues);
    };

    const formik = useFormik({
        validationSchema,
        initialValues: {
            name: context?.user ? `${context.user.name} ${context.user.second_name || ''}` : '',
            phone_number: context?.user ? context.user.phone_number : '',
            courierDelivery: true,
            selfDelivery: false,
            cashPayment: false,
            cardPayment: true,
            deliverByTime: false,
            deliveryDate: DateTime.now(),
            deliveryTime: DateTime.fromObject({ hour: DateTime.now().hour + 2, minute: 0 }),
            address: '',
            comment: '',
        },
        onSubmit,
    });

    const onSelfDeliveryChange = (setFieldValue: (field: string, value: boolean) => void) => () => {
        context && context.storeDeliveryCostTrans(0);
        sendNewDataLayer(googleAnalytics4DataLayers.generateAddShippingInfo(context?.cartItems || [], 'selfDelivery'));
        setFieldValue('selfDelivery', true);
        setFieldValue('courierDelivery', false);
    };

    const onCourierDeliveryChange = (setFieldValue: (field: string, value: boolean) => void) => () => {
        context && context.totalSum < FREE_DELIVERY_BORDER && context.storeDeliveryCostTrans(DELIVERY_COST);
        sendNewDataLayer(
            googleAnalytics4DataLayers.generateAddShippingInfo(context?.cartItems || [], 'courierDelivery'),
        );
        setFieldValue('courierDelivery', true);
        setFieldValue('selfDelivery', false);
    };

    const onCashPaymentChange = (setFieldValue: (field: string, value: boolean) => void) => () => {
        sendNewDataLayer(googleAnalytics4DataLayers.generateAddPaymentInfo(context?.cartItems || [], 'cashPayment'));
        setFieldValue('cashPayment', true);
        setFieldValue('cardPayment', false);
    };

    const onCardPaymentChange = (setFieldValue: (field: string, value: boolean) => void) => () => {
        sendNewDataLayer(googleAnalytics4DataLayers.generateAddPaymentInfo(context?.cartItems || [], 'cardPayment'));
        setFieldValue('cardPayment', true);
        setFieldValue('cashPayment', false);
    };

    return (
        <Wrapper>
            <Form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <Title>Доставка</Title>
                    <CheckboxWrapper onClick={onSelfDeliveryChange(formik.setFieldValue)}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                <StyledCheckbox
                                    onChange={onSelfDeliveryChange(formik.setFieldValue)}
                                    checked={formik.values.selfDelivery}
                                    name={'selfDelivery'}
                                />
                                <CheckboxLabel>Самовывоз</CheckboxLabel>
                            </Stack>
                            <DeliveryCost>+ 0 ₽</DeliveryCost>
                        </Stack>
                    </CheckboxWrapper>
                    <CheckboxWrapper onClick={onCourierDeliveryChange(formik.setFieldValue)}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                <StyledCheckbox
                                    onChange={onCourierDeliveryChange(formik.setFieldValue)}
                                    checked={formik.values.courierDelivery}
                                    name={'courierDelivery'}
                                />
                                <Stack>
                                    <CheckboxLabel>Курьером</CheckboxLabel>
                                    {context?.totalSum && context.totalSum < FREE_DELIVERY_BORDER ? (
                                        <CheckboxSubLabel>
                                            <span>До бесплатной доставки:</span>
                                            {FREE_DELIVERY_BORDER - Math.floor(context.totalSum)} ₽
                                        </CheckboxSubLabel>
                                    ) : null}
                                </Stack>
                            </Stack>

                            <DeliveryCost>
                                {Math.floor(context?.totalSum || 0) >= FREE_DELIVERY_BORDER ? '+ 0 ₽' : '+ 200 ₽'}
                            </DeliveryCost>
                        </Stack>
                    </CheckboxWrapper>
                    <FormGroup>
                        <StyledFormControlLabel
                            control={
                                <StyledSwitch
                                    onChange={formik.handleChange}
                                    checked={formik.values.deliverByTime}
                                    name={'deliverByTime'}
                                />
                            }
                            label="Доставить ко времени"
                        />
                    </FormGroup>

                    {formik.values.deliverByTime && (
                        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ru-RU">
                            <DatePicker
                                value={formik.values.deliveryDate}
                                label={'Дата доставки'}
                                onChange={(newValue) => formik.setFieldValue('deliveryDate', newValue)}
                                name={'deliveryDate'}
                            />
                            <TimePicker
                                value={formik.values.deliveryTime}
                                label={'Время доставки'}
                                onChange={(newValue) => formik.setFieldValue('deliveryTime', newValue)}
                                name={'deliveryTime'}
                            />
                        </LocalizationProvider>
                    )}
                    {formik.values.courierDelivery && (
                        <StyledTextField
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            name={'address'}
                            label={'Адрес'}
                            multiline
                            rows={3}
                        />
                    )}

                    <StyledTextField
                        onChange={formik.handleChange}
                        label={'Комментарии к заказу'}
                        value={formik.values.comment}
                        name={'comment'}
                        multiline
                        rows={3}
                    />

                    <Title>Получатель</Title>
                    <StyledTextField
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        label={'Контактное лицо (ФИО)'}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        name={'name'}
                        required
                    />
                    <StyledTextField
                        error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                        helperText={formik.touched.phone_number && formik.errors.phone_number}
                        value={formik.values.phone_number}
                        onChange={formik.handleChange}
                        label={'Контактный телефон'}
                        name={'phone_number'}
                        required
                    />
                    <Title>Способ оплаты</Title>
                    <CheckboxWrapper onClick={onCashPaymentChange(formik.setFieldValue)}>
                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                            <StyledCheckbox checked={formik.values.cashPayment} name={'cashPayment'} />
                            <CheckboxLabel>Наличными курьеру</CheckboxLabel>
                        </Stack>
                    </CheckboxWrapper>
                    <CheckboxWrapper onClick={onCardPaymentChange(formik.setFieldValue)}>
                        <Stack direction={'row'} spacing={1} alignItems={'center'}>
                            <StyledCheckbox checked={formik.values.cardPayment} name={'cardPayment'} />
                            <CheckboxLabel>Картой курьеру</CheckboxLabel>
                        </Stack>
                    </CheckboxWrapper>
                    <ButtonWrapper>
                        <Button
                            disabled={context?.totalSum === 0}
                            loading={context?.createOrderFetching}
                            type={'submit'}
                        >
                            <div>Подтвердить заказ</div>
                        </Button>
                    </ButtonWrapper>
                </Stack>
            </Form>
        </Wrapper>
    );
};

export default Delivery;
