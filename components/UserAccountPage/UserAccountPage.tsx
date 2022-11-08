import {
    ButtonWrapper,
    ChangePasswordForm,
    CheckboxWrapper,
    ContentWrapper,
    PasswordInputWrapper,
    UserData,
} from './styles';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';

import Button from '../Button/Button';
import PageTitle from '../PageTitle/PageTitle';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { userReducerValues } from '../../slices/User/user';
import { withUserAccountSidebar } from '../../layouts/UserAccountSidebarLayout/UserAccountSidebarLayout';

/**
 * Компонент для обновления данных пользователя
 */
const UserAccountPage = () => {
    const { userFetching, userFetchingError, user } = useSelector(userReducerValues);
    const [checked, setChecked] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <div>
            <PageTitle>
                <div>Контактные данные</div>
            </PageTitle>
            <ContentWrapper>
                {userFetching && <div>Загрузка данных...</div>}
                {userFetchingError && <div>Ошибка получения данных пользователя</div>}
                {user && (
                    <>
                        <UserData>
                            <span>Имя:</span>
                            {user.name}
                        </UserData>
                        <UserData>
                            <span>Телефон:</span>
                            {user.phone_number}
                        </UserData>
                        <UserData>
                            <span>Email:</span>
                            {user.email}
                        </UserData>
                        <CheckboxWrapper>
                            <FormControlLabel
                                control={<Checkbox checked={checked} onChange={handleChange} />}
                                label="Сменить пароль"
                            />
                        </CheckboxWrapper>
                    </>
                )}
                {checked && (
                    <ChangePasswordForm>
                        <PasswordInputWrapper>
                            <TextField fullWidth={true} label="Старый пароль" />
                        </PasswordInputWrapper>

                        <PasswordInputWrapper>
                            <TextField fullWidth={true} label="Новый пароль" />
                        </PasswordInputWrapper>
                        <PasswordInputWrapper>
                            <TextField fullWidth={true} label="Повторите пароль" />
                        </PasswordInputWrapper>
                        <ButtonWrapper>
                            <Button width={'auto'} type="submit">
                                <div>Изменить пароль</div>
                            </Button>
                        </ButtonWrapper>
                    </ChangePasswordForm>
                )}
            </ContentWrapper>
        </div>
    );
};

export default withUserAccountSidebar(UserAccountPage);
