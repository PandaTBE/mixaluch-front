import * as yup from 'yup';
import { ButtonsWrapper, ErrorWrapper, InputsWrapper, LinkText, LoginButtonText, StyledInput, Wrapper } from './styles';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Link from 'next/link';
import PageTitle from '../../PageTitle/PageTitle';
import { storeAuthToken } from '../../../slices/User/user';
import { useAppDispatch } from '../../../hooks/mainHooks';
import useData from './hooks/useData';
import { useFormik } from 'formik';
import { userApi } from '../../../services/UserService';
import { storePageToSwitch } from '../../../slices/General/general';

/**
 * Компонент для отображения страницы входа
 */
const LoginPage = () => {
    const [login, { isError, isLoading, data }] = userApi.useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const initialValues = { email: '', password: '' };
    const dispatch = useAppDispatch();
    useData();

    useEffect(() => {
        if (data?.auth_token) {
            dispatch(storeAuthToken(data.auth_token));
        }
    }, [data]);

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const validationSchema = yup.object({
        password: yup.string().min(6, 'Минимальная длина пароля 6 символов').required('Это обязательное поле'),
        email: yup.string().email('Введите корректный email').required('Это обязательное поле'),
    });

    const onSubmit = (values: { email: string; password: string }) => {
        login(values);
    };

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
    });

    return (
        <Wrapper>
            <PageTitle>
                <div>Вход в кабинет покупателя</div>
            </PageTitle>
            {isError && (
                <ErrorWrapper>
                    <ErrorMessage text={'Сочетание логина и пароля не подходит'} />
                </ErrorWrapper>
            )}

            <InputsWrapper onSubmit={formik.handleSubmit}>
                <StyledInput
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    label={'Email'}
                    name={'email'}
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
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onMouseDown={toggleShowPassword}
                                    onClick={toggleShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <ButtonsWrapper>
                    <Stack alignItems="center" direction={'row'} spacing={2}>
                        <Button type={'submit'} disabled={isLoading} width={'75px'}>
                            <LoginButtonText>Войти</LoginButtonText>
                        </Button>
                        <Link href="/register">
                            <LinkText>Восстановить пароль</LinkText>
                        </Link>
                        <Link href="/reset-password">
                            <LinkText>Зарегестрироваться</LinkText>
                        </Link>
                    </Stack>
                </ButtonsWrapper>
            </InputsWrapper>
        </Wrapper>
    );
};

export default LoginPage;
