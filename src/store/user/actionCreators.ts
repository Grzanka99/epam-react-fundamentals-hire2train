import { IUser } from 'types/state.interface';
import { UserActionTypes } from './actionTypes';

export function userLogin(user: IUser) {
	return {
		type: UserActionTypes.USER_LOGIN,
		payload: user,
	};
}

export function userLogout() {
	return {
		type: UserActionTypes.USER_LOGOUT,
	};
}
