import { ButtonsWrapper, ErrorWrapper, InputsWrapper, LinkText, LoginButtonText, StyledInput, Wrapper } from './styles';
import { ChangeEvent, useEffect, useState } from 'react';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import Button from '../Button/Button';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Link from 'next/link';
import PageTitle from '../PageTitle/PageTitle';
import { storeAuthToken } from '../../slices/User/user';
import { useAppDispatch } from '../../hooks/mainHooks';
import { userApi } from '../../services/UserService';

/**
 * Компонент для отображения страницы входа
 */
const LoginPage = () => {
    const [login, { isError, isLoading, data }] = userApi.useLoginMutation();
    const [password, setPassword] = useState({ value: '', isError: false });
    const [email, setEmail] = useState({ value: '', isError: false });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (data?.auth_token) {
            dispatch(storeAuthToken(data.auth_token));
        }
    }, [data]);

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail((prevState) => ({ ...prevState, value: e.target.value, isError: false }));
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword((prevState) => ({ ...prevState, value: e.target.value, isError: false }));
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const onLoginClick = () => {
        if (!email.value || !password.value) {
            if (!password.value) setPassword((prevState) => ({ ...prevState, isError: true }));
            if (!email.value) setEmail((prevState) => ({ ...prevState, isError: true }));
        } else {
            login({
                password: password.value,
                email: email.value,
            });
        }
    };

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
            <InputsWrapper>
                <StyledInput label={'Email'} error={email.isError} value={email.value} onChange={onEmailChange} />
                <StyledInput
                    type={showPassword ? 'text' : 'password'}
                    onChange={onPasswordChange}
                    error={password.isError}
                    value={password.value}
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
            </InputsWrapper>
            <ButtonsWrapper>
                <Stack alignItems="center" direction={'row'} spacing={2}>
                    <Button disabled={isLoading} clickHandler={onLoginClick} width={'75px'}>
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
        </Wrapper>
    );
};

export default LoginPage;
