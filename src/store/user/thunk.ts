import { Dispatch } from 'redux';
import { IUserLoginData } from 'types/common.interface';
import { IState, IUser } from 'types/state.interface';
import { userLogin, userLogout } from './actionCreators';
import {
	getUserInfo,
	performLoginRequest,
	performLogoutRequest,
} from './services';

export const thunkUserLogin = ({ email, password }: IUserLoginData) => {
	return async function (dispatch: Dispatch) {
		const result: any | false = await performLoginRequest(email, password);
		const userInfo = await getUserInfo(result.data.result);

		if (result) {
			dispatch(
				userLogin({
					token: result.data.result,
					name: userInfo.name,
					email: userInfo.email,
					role: userInfo.role,
				})
			);
		}
	};
};

export const thunkUserLogout = () => {
	return async function (dispatch: Dispatch, getState: () => IState) {
		const user: IUser = getState().user;
		await performLogoutRequest(user.token);
		dispatch(userLogout());
	};
};
