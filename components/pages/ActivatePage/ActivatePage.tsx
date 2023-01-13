import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import PageTitle from '../../PageTitle/PageTitle';
import SuccessMessage from '../../SuccessMessage/SuccessMessage';
import { ButtonWrapper, MessageWrapper, Text, Wrapper } from './styles';
import { storePageToSwitch } from '../../../slices/General/general';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { userApi } from '../../../services/UserService';
import { useRouter } from 'next/router';

/**
 * Компонент отображения страницы активации аккаунта после регистрации
 */
const ActivatePage = () => {
    const [activate, { isLoading, error, status }] = userApi.useActivateMutation();
    const dispatch = useDispatch();
    const router = useRouter();
    const {
        query: { uid, token },
    } = router;

    const errorMessage = useMemo(() => {
        if (error && 'data' in error) {
            return JSON.stringify(Object.values(error.data || {})[0]);
        }

        return null;
    }, [error]);

    const onActivate = () => {
        if (typeof uid === 'string' && typeof token === 'string') {
            activate({ uid, token });
        }
    };

    const onLoginRedirect = () => {
        dispatch(storePageToSwitch('/user-account'));
        router.push('/login');
    };

    return (
        <Wrapper>
            <PageTitle>
                <div>Подтвердите Вашу почту</div>
            </PageTitle>
            {errorMessage && (
                <MessageWrapper>
                    <ErrorMessage text={errorMessage} />
                </MessageWrapper>
            )}
            {status === 'fulfilled' && (
                <MessageWrapper>
                    <SuccessMessage text={'Аккаунт успешно активирован!'} />
                </MessageWrapper>
            )}
            <Text>Для завершения регистрации необходимо подтвердить Вашу почту</Text>
            <ButtonWrapper>
                {status === 'fulfilled' && (
                    <Button clickHandler={onLoginRedirect}>
                        <div>Войти</div>
                    </Button>
                )}
                {status !== 'fulfilled' && (
                    <Button loading={isLoading} clickHandler={onActivate}>
                        <div>Подтвердить</div>
                    </Button>
                )}
            </ButtonWrapper>
        </Wrapper>
    );
};

export default ActivatePage;
