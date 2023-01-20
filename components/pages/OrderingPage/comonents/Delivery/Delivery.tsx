import * as yup from 'yup';
import Button from '../../../../Button/Button';
import { ButtonWrapper, DeliveryCost, DeliveryTypeWrapper, Form, StyledCheckbox, Title, Wrapper } from './styles';
import { OrderingPageContext } from '../../context';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import { useFormik } from 'formik';

/**
 * Компонент для отображения секции доставки
 */
const Delivery = () => {
    const context = useContext(OrderingPageContext);

    const phoneRegExp = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/gm;

    const initialValues = {
        address: '',
        comment: '',
        selfDelivery: false,
        courierDelivery: true,
        name: context?.user ? `${context.user.name} ${context.user.second_name}` : '',
        phone_number: context?.user ? context.user.phone_number : '',
        cashPayment: false,
        cardPayment: true,
    };

    const validationSchema = yup.object({
        name: yup.string().required('Это обязательное поле'),
        phone_number: yup.string().matches(phoneRegExp, 'Некорректный номер телефона'),
    });

    const onSubmit = (values: any) => {
        console.log(values);
    };

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
    });

    const onSelfDeliveryChange = (setFieldValue: (field: string, value: boolean) => void) => () => {
        setFieldValue('selfDelivery', !formik.values.selfDelivery);
        setFieldValue('courierDelivery', false);
    };

    const onCourierDeliveryChange = (setFieldValue: (field: string, value: boolean) => void) => () => {
        setFieldValue('courierDelivery', !formik.values.courierDelivery);
        setFieldValue('selfDelivery', false);
    };

    return (
        <Wrapper>
            <Form onSubmit={formik.handleSubmit}>
                <Stack>
                    <Title>Доставка</Title>
                    <DeliveryTypeWrapper onClick={onSelfDeliveryChange(formik.setFieldValue)}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                <StyledCheckbox
                                    onChange={onSelfDeliveryChange(formik.setFieldValue)}
                                    checked={formik.values.selfDelivery}
                                    name={'selfDelivery'}
                                />
                                <div>Самовывоз</div>
                            </Stack>
                            <DeliveryCost>+ 0 ₽</DeliveryCost>
                        </Stack>
                    </DeliveryTypeWrapper>
                    <DeliveryTypeWrapper onClick={onCourierDeliveryChange(formik.setFieldValue)}>
                        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                            <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                <StyledCheckbox
                                    onChange={onCourierDeliveryChange(formik.setFieldValue)}
                                    checked={formik.values.courierDelivery}
                                    name={'courierDelivery'}
                                />
                                <div>Курьером</div>
                            </Stack>

                            <DeliveryCost>+ 200 ₽</DeliveryCost>
                        </Stack>
                    </DeliveryTypeWrapper>

                    <Title>Получатель</Title>
                    <Title>Способ оплаты</Title>
                    <ButtonWrapper>
                        <Button type={'submit'}>
                            <div>Подтвердить заказ</div>
                        </Button>
                    </ButtonWrapper>
                </Stack>
            </Form>
        </Wrapper>
    );
};

export default Delivery;
