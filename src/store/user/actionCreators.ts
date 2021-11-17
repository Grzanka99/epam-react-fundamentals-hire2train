import * as actions from './actionTypes';

export function userLogin(user) {
	return {
		type: actions.USER_LOGIN,
		payload: user,
	};
}

export function userLogout() {
	return {
		type: actions.USER_LOGOUT,
	};
}
