import { IUserRegisterData } from 'types/common.interface';
import { IUserLoginResponse } from 'types/response.interface';
import { IUser } from 'types/state.interface';
import { axiosInstance } from './axios-instance';

export async function userSeviceLogin(
	email: string,
	password: string
): Promise<IUserLoginResponse | false> {
	let res: IUserLoginResponse | false = false;

	try {
		const response = await axiosInstance.post('/login', {
			email,
			password,
		});

		const data: IUserLoginResponse = response.data;

		if (data.successful) res = data;
	} catch (error: ErrorEvent | any | unknown) {
		alert('Wrong username or password');
	}

	return res;
}

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

export async function userServiceGetUserInfo(): Promise<IUser | false> {
	let res: IUser | false = false;

	try {
		const response = await axiosInstance.get('/users/me');
		if (response.data.successful) res = response.data.result;
	} catch (error) {
		console.log(error);
	}

	return res;
}

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
