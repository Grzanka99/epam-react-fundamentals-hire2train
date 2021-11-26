import { Dispatch } from 'redux';
import {
	userServiceGetUserInfo,
	userServiceLogout,
	userSeviceLogin,
} from 'services/user.service';
import { authorsClean } from 'store/authors/actionCreators';
import { coursesClean } from 'store/courses/actionCreators';
import { IUserLoginData } from 'types/common.interface';
import { userLogin, userLogout, setUserInfo } from './actionCreators';

export const thunkUserLogin = ({ email, password }: IUserLoginData) =>
	async function (dispatch: Dispatch) {
		try {
			const token: any = await userSeviceLogin(email, password);

			localStorage.setItem('token', token.result);
			dispatch(userLogin(token.result));
		} catch (err) {}
	};

export const getCurrentUser = (): any => async (dispatch: Dispatch) => {
	try {
		const userInfo: any = await userServiceGetUserInfo();

		dispatch(
			setUserInfo({
				...userInfo,
			})
		);
	} catch (err) {
		console.log(err);
	}
};

export const thunkUserLogout = () =>
	async function (dispatch: Dispatch) {
		try {
			await userServiceLogout();
			localStorage.clear();

			dispatch(userLogout());
			dispatch(authorsClean());
			dispatch(coursesClean());
		} catch (err) {}
	};
