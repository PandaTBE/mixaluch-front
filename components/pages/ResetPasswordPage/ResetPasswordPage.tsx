import * as yup from 'yup';
import Button from '../../Button/Button';
import PageTitle from '../../PageTitle/PageTitle';
import { ButtonsWrapper, Form, MessageWrapper, ResetButtonWrapper, StyledInput, Wrapper } from './styles';
import { IUserResetPasswordDTO } from '../../../models/User';
import { useFormik } from 'formik';
import { useMemo } from 'react';
import { userApi } from '../../../services/UserService';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import SuccessMessage from '../../SuccessMessage/SuccessMessage';

/**
 * компонент для отображения страницы восстановления пароля
 */
const ResetPasswordPage = () => {
    const [resetPassword, { status, isLoading, error }] = userApi.useResetPasswordMutation();
    const initialValues = { email: '' };

    const errorMessage = useMemo(() => {
        if (error && 'data' in error) {
            return JSON.stringify(Object.values(error.data || {})[0]);
        }

        return null;
    }, [error]);

    const validationSchema = yup.object({
        email: yup.string().email('Введите корректный email').required('Это обязательное поле'),
    });

    const onSubmit = (values: IUserResetPasswordDTO) => {
        resetPassword(values);
    };

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit,
    });

    return (
        <Wrapper>
            <PageTitle text={'Восстановление пароля'} />

            {errorMessage && (
                <MessageWrapper>
                    <ErrorMessage text={errorMessage} />
                </MessageWrapper>
            )}

            {status === 'fulfilled' && (
                <MessageWrapper>
                    <SuccessMessage text={'Вам на почту была направлена инструкция для изменения пароля'} />
                </MessageWrapper>
            )}
            <Form onSubmit={formik.handleSubmit}>
                <StyledInput
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    label={'Email'}
                    name={'email'}
                    required
                />
                <ButtonsWrapper>
                    <ResetButtonWrapper>
                        <Button loading={isLoading} type={'submit'}>
                            <div>Восстановить</div>
                        </Button>
                    </ResetButtonWrapper>
                </ButtonsWrapper>
            </Form>
        </Wrapper>
    );
};

export default ResetPasswordPage;
