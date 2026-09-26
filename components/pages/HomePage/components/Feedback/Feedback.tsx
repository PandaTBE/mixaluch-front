import { useFormik } from 'formik';
import {
    ButtonWrapper,
    ContentWrapper,
    Form,
    FormWrapper,
    MessageWrapper,
    TextWrapper,
    Title,
    SubmitButton,
    Wrapper,
} from './styles';
import * as yup from 'yup';
import { CircularProgress, Stack, TextField } from '@mui/material';
import { telegramApi } from '../../../../../services/TelegramService';
import SuccessMessage from '../../../../SuccessMessage/SuccessMessage';
import ErrorMessage from '../../../../ErrorMessage/ErrorMessage';
import transformTextToHtmlFormat from './tools/transformTextToHtmlFormat';
import { useEffect } from 'react';

/**
 * Компонент для отображения секции с обратной связью
 */
const Feedback = () => {
    const [sendMessage, { data, isLoading, isError }] = telegramApi.useSendMessageMutation();
    const initialValues = { name: '', email: '', text: '' };

    useEffect(() => {
        if (data?.ok) formik.resetForm();
    }, [data]);

    const validationSchema = yup.object({
        email: yup.string().email('Введите корректный email').required('Это обязательное поле'),
        name: yup.string().required('Это обязательное поле'),
        text: yup.string().required('Это обязательное поле'),
    });

    const onSubmit = (values: { name: string; email: string; text: string }) => {
        sendMessage(transformTextToHtmlFormat('Новое сообщение от пользователя', values));
    };

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
    });

    return (
        <Wrapper aria-labelledby="feedback-title">
            <ContentWrapper>
                <div>
                    <Title id="feedback-title">Напишите Михалычу</Title>
                    <p>Спросите о продуктах и заказах или поделитесь впечатлением о покупке.</p>
                    <p id="feedback-reply-hint">Ответим на указанную почту.</p>
                </div>
                <FormWrapper>
                    <MessageWrapper role="status" aria-live="polite">
                        {data?.ok && <SuccessMessage text={'Спасибо! Ваше сообщение отправлено.'} />}
                        {(isError || data?.ok === false) && (
                            <ErrorMessage text={'Не удалось отправить сообщение. Попробуйте ещё раз.'} />
                        )}
                    </MessageWrapper>
                    <Form
                        onSubmit={formik.handleSubmit}
                        noValidate
                        aria-describedby="feedback-reply-hint"
                        aria-busy={isLoading}
                    >
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <TextField
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                fullWidth={true}
                                label={'Ваше имя'}
                                id="feedback-name"
                                autoComplete="name"
                                required
                                name="name"
                            />
                            <TextField
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                label={'Электронная почта'}
                                id="feedback-email"
                                type="email"
                                autoComplete="email"
                                required
                                fullWidth={true}
                                name="email"
                            />
                        </Stack>
                        <TextWrapper>
                            <TextField
                                error={formik.touched.text && Boolean(formik.errors.text)}
                                helperText={formik.touched.text && formik.errors.text}
                                label={'Сообщение'}
                                id="feedback-message"
                                required
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.text}
                                fullWidth={true}
                                multiline={true}
                                name="text"
                                rows={4}
                            />
                        </TextWrapper>
                        <ButtonWrapper>
                            <SubmitButton type="submit" disabled={isLoading}>
                                {isLoading && <CircularProgress size={18} color="inherit" aria-hidden="true" />}
                                {isLoading ? 'Отправляем…' : 'Отправить сообщение'}
                            </SubmitButton>
                        </ButtonWrapper>
                    </Form>
                </FormWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Feedback;
