export interface IUser {
    phone_number: string;
    email: string;
    name: string;
    id: number;
}

export interface IUserLoginDTO {
    password: string;
    email: string;
}

export interface IUserRegisterDTO {
    email: string;
    name: string;
    second_name: null | string;
    phone_number: string;
    password: string;
    re_password: string;
}

export interface IUserActivateDTO {
    uid: string;
    token: string;
}

export interface IUserResetPasswordDTO {
    email: string;
}

export interface IUserResetPasswordConfirmDTO {
    uid: string;
    token: string;
    new_password: string;
    re_new_password: string;
}
