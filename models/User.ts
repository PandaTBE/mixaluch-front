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
