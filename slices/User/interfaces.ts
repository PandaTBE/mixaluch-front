export interface IState {
    authToken: null | string;
    user: null | IUser;
}

export interface IUser {
    phone_number: string;
    email: string;
    name: string;
    id: number;
}

export interface ILoginDTO {
    email: string;
    password: string;
}
