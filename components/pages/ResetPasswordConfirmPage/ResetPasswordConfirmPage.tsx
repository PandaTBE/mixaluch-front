import * as yup from 'yup';
import Button from '../../Button/Button';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import PageTitle from '../../PageTitle/PageTitle';
import SuccessMessage from '../../SuccessMessage/SuccessMessage';
import { ButtonWrapper, Form, MessageWrapper, ResetConfirmButtonWrapper, StyledInput, Wrapper } from './styles';
import { storePageToSwitch } from '../../../slices/General/general';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { userApi } from '../../../services/UserService';
import { useRouter } from 'next/router';

/**
 * Компонент для отображения страницы подтверждения сброса пароля
 */
const ResetPasswordConfirmPage = () => {
    const [resetPasswordConfirm, { isLoading, error, status }] = userApi.useResetPasswordConfirmMutation();
    const router = useRouter();
    const {
        query: { uid, token },
    } = router;
    const dispatch = useDispatch();
    const initialValues = { new_password: '', re_new_password: '' };

    const errorMessage = useMemo(() => {
        if (error && 'data' in error) {
            return JSON.stringify(Object.values(error.data || {})[0]);
        }

        return null;
    }, [error]);

    const validationSchema = yup.object({
        new_password: yup.string().min(8, 'Минимальная длина пароля 8 символов').required('Это обязательное поле'),
        re_new_password: yup
            .string()
            .oneOf([yup.ref('new_password'), null], 'Пароли должны совпадать')
            .required('Это обязательное поле'),
    });

    const onSubmit = (values: { new_password: string; re_new_password: string }) => {
        if (typeof uid === 'string' && typeof token === 'string') {
            resetPasswordConfirm({
                ...values,
                token,
                uid,
            });
        }
    };

    const onLoginRedirect = () => {
        dispatch(storePageToSwitch('/user-account'));
        router.push('/login');
    };

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
    });

    return (
        <Wrapper>
            <PageTitle>
                <div>Восстановление пароля</div>
            </PageTitle>

            {errorMessage && (
                <MessageWrapper>
                    <ErrorMessage text={errorMessage} />
                </MessageWrapper>
            )}

            {status === 'fulfilled' && (
                <MessageWrapper>
                    <SuccessMessage text={'Пароль успешно обновлен'} />
                </MessageWrapper>
            )}
            <Form onSubmit={formik.handleSubmit}>
                <StyledInput
                    error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                    helperText={formik.touched.new_password && formik.errors.new_password}
                    value={formik.values.new_password}
                    onChange={formik.handleChange}
                    label={'Новый пароль'}
                    name={'new_password'}
                    required
                />
                <StyledInput
                    error={formik.touched.re_new_password && Boolean(formik.errors.re_new_password)}
                    helperText={formik.touched.re_new_password && formik.errors.re_new_password}
                    value={formik.values.re_new_password}
                    onChange={formik.handleChange}
                    label={'Повторите пароль'}
                    name={'re_new_password'}
                    required
                />
                <ButtonWrapper>
                    <ResetConfirmButtonWrapper>
                        {status === 'fulfilled' && (
                            <Button loading={isLoading} clickHandler={onLoginRedirect}>
                                <div>Войти</div>
                            </Button>
                        )}
                        {status !== 'fulfilled' && (
                            <Button loading={isLoading} type={'submit'}>
                                <div>Изменить пароль</div>
                            </Button>
                        )}
                    </ResetConfirmButtonWrapper>
                </ButtonWrapper>
            </Form>
        </Wrapper>
    );
};

export default ResetPasswordConfirmPage;
