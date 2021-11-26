import { IUser } from 'types/state.interface';

import { UserActionTypes } from './actionTypes';

export const userLogin = (token: string) => ({
	type: UserActionTypes.USER_LOGIN,
	payload: token,
});

export const userLogout = () => ({
	type: UserActionTypes.USER_LOGOUT,
});

export const userSetInfo = (user: IUser) => ({
	type: UserActionTypes.USER_SETINFO,
	payload: user,
});
