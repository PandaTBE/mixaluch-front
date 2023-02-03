import * as yup from 'yup';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Link from 'next/link';
import PageTitle from '../../PageTitle/PageTitle';
import SuccessMessage from '../../SuccessMessage/SuccessMessage';
import { IconButton, InputAdornment } from '@mui/material';
import { Stack } from '@mui/system';
import { useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { userApi } from '../../../services/UserService';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    ButtonsWrapper,
    MessageWrapper,
    LinkText,
    RegisterButtonWrapper,
    StyledForm,
    StyledInput,
    Wrapper,
    NameWrapper,
} from './styles';

/**
 * Страница регистрации
 */
const RegisterPage = () => {
    const [register, { isLoading, error, data }] = userApi.useRegisterMutation();
    const [showRePassword, setShowRePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const initialValues = { name: '', second_name: '', email: '', phone_number: '', password: '', re_password: '' };

    const toggleShowRePassword = () => {
        setShowRePassword((prevState) => !prevState);
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const errorMessage = useMemo(() => {
        if (error && 'data' in error) {
            return JSON.stringify(Object.values(error.data || {})[0]);
        }

        return null;
    }, [error]);

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

    const onSubmit = (body: {
        phone_number: string;
        second_name: string;
        re_password: string;
        password: string;
        email: string;
        name: string;
    }) => {
        register(body);
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
            {errorMessage && (
                <MessageWrapper>
                    <ErrorMessage text={errorMessage} />
                </MessageWrapper>
            )}

            {data && (
                <MessageWrapper>
                    <SuccessMessage text={'Для завершения регистрации подтвердите свою почту'} />
                </MessageWrapper>
            )}
            <StyledForm onSubmit={formik.handleSubmit}>
                <NameWrapper>
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
                </NameWrapper>
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
                    type={showPassword ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name={'password'}
                    label={'Пароль'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <StyledInput
                    error={formik.touched.re_password && Boolean(formik.errors.re_password)}
                    helperText={formik.touched.re_password && formik.errors.re_password}
                    type={showRePassword ? 'text' : 'password'}
                    onChange={formik.handleChange}
                    value={formik.values.re_password}
                    name={'re_password'}
                    label={'Повторите пароль'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={toggleShowRePassword} edge="end">
                                    {showRePassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <ButtonsWrapper>
                    <Stack direction={'row'} flexWrap={{ xs: 'wrap' }} gap={2} alignItems={'center'}>
                        <RegisterButtonWrapper>
                            <Button loading={isLoading} type={'submit'}>
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
