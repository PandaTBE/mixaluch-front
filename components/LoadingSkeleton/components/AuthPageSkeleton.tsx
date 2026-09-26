import { AuthActions } from './styles';
import Skeleton from 'react-loading-skeleton';
import PageTitle from '../../PageTitle/PageTitle';
import * as Login from '../../pages/LoginPage/styles';
import * as Register from '../../pages/RegisterPage/styles';
import * as Reset from '../../pages/ResetPasswordPage/styles';
import * as Confirm from '../../pages/ResetPasswordConfirmPage/styles';
import * as Activate from '../../pages/ActivatePage/styles';

const field = <Skeleton height={56} containerClassName="skeleton-block" />;

const AuthPageSkeleton = ({ path }: { path: string }) => {
    if (path === '/register')
        return (
            <Register.Wrapper aria-hidden="true">
                <PageTitle text="Регистрация" />
                <Register.StyledForm as="div">
                    <Register.NameWrapper>
                        <Register.StyledInput as="div" width="100%">
                            {field}
                        </Register.StyledInput>
                        <Register.StyledInput as="div" width="100%">
                            {field}
                        </Register.StyledInput>
                    </Register.NameWrapper>
                    {[0, 1, 2, 3].map((index) => (
                        <Register.StyledInput as="div" key={index}>
                            {field}
                        </Register.StyledInput>
                    ))}
                    <Register.ButtonsWrapper>
                        <AuthActions direction="row">
                            <Skeleton width={175} height={40} />
                            <Skeleton width={184} />
                        </AuthActions>
                    </Register.ButtonsWrapper>
                </Register.StyledForm>
            </Register.Wrapper>
        );

    if (path === '/login')
        return (
            <Login.Wrapper aria-hidden="true">
                <PageTitle text="Вход в кабинет покупателя" />
                <Login.InputsWrapper as="div">
                    <Login.StyledInput as="div">{field}</Login.StyledInput>
                    <Login.StyledInput as="div">{field}</Login.StyledInput>
                    <Login.ButtonsWrapper>
                        <AuthActions direction="row">
                            <Skeleton width={75} height={40} />
                            <Skeleton width={159} />
                            <Skeleton width={156} />
                        </AuthActions>
                    </Login.ButtonsWrapper>
                </Login.InputsWrapper>
            </Login.Wrapper>
        );

    if (path.startsWith('/activate/'))
        return (
            <Activate.Wrapper aria-hidden="true">
                <PageTitle text="Подтвердите Вашу почту" />
                <Activate.Text>Для завершения регистрации необходимо подтвердить Вашу почту</Activate.Text>
                <Activate.ButtonWrapper>
                    <Skeleton height={40} />
                </Activate.ButtonWrapper>
            </Activate.Wrapper>
        );

    if (path === '/reset-password')
        return (
            <Reset.Wrapper aria-hidden="true">
                <PageTitle text="Восстановление пароля" />
                <Reset.Form as="div">
                    <Reset.StyledInput as="div">{field}</Reset.StyledInput>
                    <Reset.ButtonsWrapper>
                        <Skeleton width={130} height={40} />
                    </Reset.ButtonsWrapper>
                </Reset.Form>
            </Reset.Wrapper>
        );

    return (
        <Confirm.Wrapper aria-hidden="true">
            <PageTitle text="Восстановление пароля" />
            <Confirm.Form as="div">
                <Confirm.StyledInput as="div">{field}</Confirm.StyledInput>
                <Confirm.StyledInput as="div">{field}</Confirm.StyledInput>
                <Confirm.ButtonWrapper>
                    <Skeleton width={155} height={40} />
                </Confirm.ButtonWrapper>
            </Confirm.Form>
        </Confirm.Wrapper>
    );
};

export default AuthPageSkeleton;
