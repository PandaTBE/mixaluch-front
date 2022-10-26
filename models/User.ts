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
