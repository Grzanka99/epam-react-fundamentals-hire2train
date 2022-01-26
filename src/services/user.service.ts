import { IUserRegisterData } from 'types/common.interface';
import { IUser } from 'types/state.interface';

import { axiosInstance } from './axios-instance';

export const userServiceLogin = (
	email: string,
	password: string
): Promise<string> =>
	axiosInstance
		.post('/login', { email, password })
		.then((res) => res.data.result);

export const userServiceRegister = (data: IUserRegisterData): Promise<any> =>
	axiosInstance.post('/register', { ...data }).then((res) => res.data);

export const userServiceGetUserInfo = (): Promise<IUser> =>
	axiosInstance.get('/users/me').then((res) => res.data.result);

export const userServiceLogout = (): Promise<any> =>
	axiosInstance.delete('/logout').then((res) => res.data);
