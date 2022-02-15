import { IUser } from './state.interface';

export interface IUserLoginResponse {
	successful: boolean;
	result: string;
	user: {
		email: string;
		name: string | null;
	};
}

export interface IUserGetInfo {
	successful: boolean;
	user: IUser;
}
