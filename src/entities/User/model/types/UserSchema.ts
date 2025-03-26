export interface IUser {
    username: string;
}
export interface UserSchema {
    authData: IUser | undefined;
}