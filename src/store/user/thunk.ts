import axios from 'axios';
import { API } from 'helpers/constants';
import { Dispatch } from 'redux';
import { getUserInfo, performLoginRequest } from 'store/services';
import { IUserLoginData } from 'types/common.interface';
import { IState, IUser } from 'types/state.interface';
import { userLogin, userLogout } from './actionCreators';

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

		await axios.delete(`${API}/logout`, {
			headers: {
				Authorization: user.token,
			},
		});

		dispatch(userLogout());
	};
};
