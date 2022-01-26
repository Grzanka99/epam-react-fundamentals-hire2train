import { IUserLoginData } from 'types/common.interface';

import {
	userServiceGetUserInfo,
	userServiceLogin,
	userServiceLogout,
} from 'services/user.service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from 'types/state.interface';

export enum UsersAsync {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	GET_USER = 'GET_USER',
}

export const thunkUserLogin = createAsyncThunk<
	string | undefined,
	IUserLoginData
>(UsersAsync.LOGIN, async ({ email, password }) => {
	try {
		const token: string = await userServiceLogin(email, password);
		localStorage.setItem('token', token);
		return token;
	} catch (error) {
		console.log(error);
	}
});

export const thunkUserLogout = createAsyncThunk<true | undefined>(
	UsersAsync.LOGOUT,
	async () => {
		try {
			await userServiceLogout();
			localStorage.clear();

			return true;
		} catch (error) {
			console.log(error);
		}
	}
);

export const thunkGetCurrentUser = createAsyncThunk<IUser | undefined>(
	UsersAsync.GET_USER,
	async () => {
		try {
			return await userServiceGetUserInfo();
		} catch (error) {
			console.log(error);
		}
	}
);
