import { IUser } from 'types/state.interface';
import { UserActionTypes } from './actionTypes';

export function userLogin(token: string) {
	return {
		type: UserActionTypes.USER_LOGIN,
		payload: token,
	};
}

export function userLogout() {
	return {
		type: UserActionTypes.USER_LOGOUT,
	};
}

export function setUserInfo(user: IUser) {
	return {
		type: UserActionTypes.SET_USER,
		payload: user,
	};
}
