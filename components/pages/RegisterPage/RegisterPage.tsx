import { Stack } from '@mui/system';
import PageTitle from '../../PageTitle/PageTitle';
import { ButtonsWrapper, LinkText, RegisterButtonWrapper, StyledForm, StyledInput, Wrapper } from './styles';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Button from '../../Button/Button';
import Link from 'next/link';

/**
 * Страница регистрации
 */
const RegisterPage = () => {
    const initialValues = { name: '', second_name: '', email: '', phone_number: '', password: '', re_password: '' };

    const phoneRegExp = /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/gm;

    const validationSchema = yup.object({
        re_password: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Это обязательное поле'),
        password: yup.string().min(6, 'Минимальная длина пароля 6 символов').required('Это обязательное поле'),
        email: yup.string().email('Введите корректный email').required('Это обязательное поле'),
        phone_number: yup.string().matches(phoneRegExp, 'Некорректный номер телефона'),
        name: yup.string().required('Это обязательное поле'),
    });

    const onSubmit = (values: {
        phone_number: string;
        second_name: string;
        re_password: string;
        password: string;
        email: string;
        name: string;
    }) => {
        console.log(values);
    };

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
    });

    return (
        <Wrapper>
            <PageTitle>
                <div>Регистрация</div>
            </PageTitle>
            <StyledForm onSubmit={formik.handleSubmit}>
                <Stack direction={'row'} width={'50%'} spacing={2}>
                    <StyledInput
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        required
                        width={'100%'}
                        name={'name'}
                        label={'Имя'}
                    />
                    <StyledInput
                        onChange={formik.handleChange}
                        value={formik.values.second_name}
                        width={'100%'}
                        name={'second_name'}
                        label={'Фамилия'}
                    />
                </Stack>
                <StyledInput
                    error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                    helperText={formik.touched.phone_number && formik.errors.phone_number}
                    onChange={formik.handleChange}
                    value={formik.values.phone_number}
                    required
                    name={'phone_number'}
                    label={'Контактный телефон'}
                />
                <StyledInput
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    required
                    name={'email'}
                    label={'Email'}
                />
                <StyledInput
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                    name={'password'}
                    label={'Пароль'}
                />
                <StyledInput
                    error={formik.touched.re_password && Boolean(formik.errors.re_password)}
                    helperText={formik.touched.re_password && formik.errors.re_password}
                    onChange={formik.handleChange}
                    value={formik.values.re_password}
                    required
                    name={'re_password'}
                    label={'Повторите пароль'}
                />
                <ButtonsWrapper>
                    <Stack direction={'row'} alignItems={'center'} spacing={2}>
                        <RegisterButtonWrapper>
                            <Button loading={false} type={'submit'}>
                                <div>Зарегистрироваться</div>
                            </Button>
                        </RegisterButtonWrapper>
                        <Link href="/login">
                            <LinkText>У меня уже есть аккаунт</LinkText>
                        </Link>
                    </Stack>
                </ButtonsWrapper>
            </StyledForm>
        </Wrapper>
    );
};

export default RegisterPage;
