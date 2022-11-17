import { useFormik } from 'formik';
import { ButtonWrapper, ContentWrapper, Form, FormWrapper, TextWrapper, Title, Wrapper } from './styles';
import * as yup from 'yup';
import { Stack, TextField } from '@mui/material';
import Button from '../../../Button/Button';

/**
 * Компонент для отображения секции с обратной связью
 */
const Feedback = () => {
    const initialValues = { name: '', email: '', text: '' };

    const validationSchema = yup.object({
        email: yup.string().email('Введите корректный email').required('Это обязательное поле'),
        name: yup.string().required('Это обязательное поле'),
        text: yup.string().required('Это обязательное поле'),
    });

    const onSubmit = (values: { name: string; email: string; text: string }) => {
        console.log(values);
    };

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
    });

    return (
        <Wrapper>
            <ContentWrapper>
                <Title>Обратнаяа связь</Title>
                <FormWrapper>
                    <Form onSubmit={formik.handleSubmit}>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                name="name"
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                value={formik.values.name}
                                helperText={formik.touched.name && formik.errors.name}
                                onChange={formik.handleChange}
                                fullWidth={true}
                                label={'Имя'}
                            />
                            <TextField
                                name="email"
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                value={formik.values.email}
                                helperText={formik.touched.email && formik.errors.email}
                                onChange={formik.handleChange}
                                fullWidth={true}
                                label={'Ваша почта'}
                            />
                        </Stack>
                        <TextWrapper>
                            <TextField
                                name="text"
                                error={formik.touched.text && Boolean(formik.errors.text)}
                                value={formik.values.text}
                                helperText={formik.touched.text && formik.errors.text}
                                onChange={formik.handleChange}
                                fullWidth={true}
                                label={'Ваш вопрос, отзыв или пожелание'}
                                multiline={true}
                                rows={4}
                            />
                        </TextWrapper>
                        <ButtonWrapper>
                            <Button type={'submit'} width={'30%'}>
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
