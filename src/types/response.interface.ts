import { IUser } from './state.interface';

export interface IResponse<T> {
	successful: boolean;
	result: T;
}

export interface IUserLoginResponse extends IResponse<string> {
	user: {
		email: string;
		name: string | null;
	};
}

export interface IUserGetInfo extends IResponse<void> {
	user: IUser;
}

export interface ICreateUserResponse extends IResponse<string> {}
