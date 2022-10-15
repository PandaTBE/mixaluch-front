import { Stack } from '@mui/material';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks/mainHooks';
import { loginThunk } from '../../slices/User/user';
import Button from '../Button/Button';
import PageTitle from '../PageTitle/PageTitle';
import { ButtonsWrapper, InputsWrapper, LinkText, LoginButtonText, StyledInput, Wrapper } from './styles';
import TextField from '@mui/material/TextField';

/**
 * Компонент для отображения страницы входа
 */
const LoginPage = () => {
    const [password, setPassword] = useState({ value: '', isError: false });
    const [email, setEmail] = useState({ value: '', isError: false });
    const dispatch = useAppDispatch();

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail((prevState) => ({ ...prevState, value: e.target.value, isError: false }));
    };

    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword((prevState) => ({ ...prevState, value: e.target.value, isError: false }));
    };

    const onLoginClick = () => {
        if (!email.value || !password.value) {
            if (!password.value) setPassword((prevState) => ({ ...prevState, isError: true }));
            if (!email.value) setEmail((prevState) => ({ ...prevState, isError: true }));
        } else {
            dispatch(
                loginThunk({
                    password: password.value,
                    email: email.value,
                }),
            );
        }
    };

    return (
        <Wrapper>
            <PageTitle>
                <div>Вход в кабинет покупателя</div>
            </PageTitle>
            <InputsWrapper>
                <StyledInput label={'Email'} error={email.isError} value={email.value} onChange={onEmailChange} />
                <StyledInput
                    onChange={onPasswordChange}
                    error={password.isError}
                    value={password.value}
                    label={'Пароль'}
                />
            </InputsWrapper>
            <ButtonsWrapper>
                <Stack alignItems="center" direction={'row'} spacing={2}>
                    <Button clickHandler={onLoginClick} width={'75px'}>
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
