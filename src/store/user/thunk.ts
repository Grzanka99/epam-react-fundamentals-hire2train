import { Dispatch } from 'redux';
import {
	userServiceGetUserInfo,
	userServiceLogout,
	userSeviceLogin,
} from 'services/user.service';
import { authorsClean } from 'store/authors/actionCreators';
import { coursesClean } from 'store/courses/actionCreators';
import { IUserLoginData } from 'types/common.interface';
import { IUser } from 'types/state.interface';
import { userLogin, userLogout, userSetInfo } from './actionCreators';

export const thunkUserLogin =
	({ email, password }: IUserLoginData) =>
	async (dispatch: Dispatch) => {
		try {
			const token: string = await userSeviceLogin(email, password);
			localStorage.setItem('token', token);
			dispatch(userLogin(token));
		} catch (error) {
			console.log(error);
			alert('Wrong username or password');
		}
	};

export const thunkGetCurrentUser = () => async (dispatch: Dispatch) => {
	try {
		const userInfo: IUser = await userServiceGetUserInfo();

		dispatch(userSetInfo({ ...userInfo }));
	} catch (error) {
		console.log('Error');
	}
};

export const thunkUserLogout = () => async (dispatch: Dispatch) => {
	try {
		await userServiceLogout();
		localStorage.clear();

		dispatch(userLogout());
		dispatch(authorsClean());
		dispatch(coursesClean());
	} catch (error) {
		console.log(error);
		alert('Error while Logging out!');
	}
};
