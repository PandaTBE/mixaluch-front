import { useFormik } from 'formik';
import {
    ButtonWrapper,
    ContentWrapper,
    Form,
    FormWrapper,
    MessageWrapper,
    TextWrapper,
    Title,
    Wrapper,
} from './styles';
import * as yup from 'yup';
import { Stack, TextField } from '@mui/material';
import Button from '../../../../Button/Button';
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
        <Wrapper>
            <ContentWrapper>
                <Title>Обратная связь</Title>
                <MessageWrapper>
                    {data && <SuccessMessage text={'Сообщение успешно отправлено!'} />}
                    {isError && <ErrorMessage text={'Возникла ошибка, попробуйте еще раз!'} />}
                </MessageWrapper>
                <FormWrapper>
                    <Form onSubmit={formik.handleSubmit}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                fullWidth={true}
                                label={'Имя'}
                                name="name"
                            />
                            <TextField
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                label={'Ваша почта'}
                                fullWidth={true}
                                name="email"
                            />
                        </Stack>
                        <TextWrapper>
                            <TextField
                                error={formik.touched.text && Boolean(formik.errors.text)}
                                helperText={formik.touched.text && formik.errors.text}
                                label={'Ваш вопрос, отзыв или пожелание'}
                                onChange={formik.handleChange}
                                value={formik.values.text}
                                fullWidth={true}
                                multiline={true}
                                name="text"
                                rows={4}
                            />
                        </TextWrapper>
                        <ButtonWrapper>
                            <Button loading={isLoading} type={'submit'} width={'35%'}>
                                <div>Отправить</div>
                            </Button>
                        </ButtonWrapper>
                    </Form>
                </FormWrapper>
            </ContentWrapper>
        </Wrapper>
    );
};

export default Feedback;
