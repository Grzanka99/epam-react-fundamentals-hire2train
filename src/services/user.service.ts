import { IUserRegisterData } from 'types/common.interface';
import { IUser } from 'types/state.interface';

import { axiosInstance } from './axios-instance';

export const userSeviceLogin = (
	email: string,
	password: string
): Promise<string> =>
	axiosInstance
		.post('/login', { email, password })
		.then((res) => res.data.result);

export async function userServiceRegister(
	data: IUserRegisterData
): Promise<boolean> {
	let res: boolean = false;

	try {
		const response = await axiosInstance.post('/register', { ...data });
		if (response.data.successful) res = true;
	} catch (error) {
		console.log(error);
	}

	return res;
}

export const userServiceGetUserInfo = (): Promise<IUser> =>
	axiosInstance.get('/users/me').then((res) => res.data.result);

export async function userServiceLogout(): Promise<boolean> {
	try {
		const response = await axiosInstance.delete('/logout');
		if (response.status === 401) {
			throw new Error('Unauthorized');
		}
	} catch (error) {
		console.log(error);
	}

	// perform logout always
	return true;
}
