import { Dispatch } from 'redux';
import {
	userServiceGetUserInfo,
	userServiceLogout,
	userSeviceLogin,
} from 'services/user.service';
import { IUserLoginData } from 'types/common.interface';
import { userLogin, userLogout } from './actionCreators';

export const thunkUserLogin = ({ email, password }: IUserLoginData) => {
	return async function (dispatch: Dispatch) {
		const result = await userSeviceLogin(email, password);
		const userInfo = await userServiceGetUserInfo();

		if (result && userInfo) {
			dispatch(
				userLogin({
					token: result.result,
					name: userInfo.name,
					email: userInfo.email,
					role: userInfo.role,
				})
			);
		}
	};
};

export const thunkUserLogout = () => {
	return async function (dispatch: Dispatch) {
		await userServiceLogout();
		dispatch(userLogout());
	};
};
