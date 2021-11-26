import { IAction } from 'types/action.interface';
import { Role } from 'types/common.enum';
import { IUser } from 'types/state.interface';

import { UserActionTypes } from './actionTypes';

const initialUserState: IUser = {
	isAuth: !!localStorage.getItem('token'),
	name: '',
	email: '',
	token: '',
	role: Role.None,
};

export function userReducer(
	state = initialUserState,
	action: IAction<UserActionTypes, IUser | string>
): IUser {
	switch (action.type) {
		case UserActionTypes.USER_LOGIN: {
			return {
				...state,
				isAuth: true,
				token: action.payload as string,
			};
		}
		case UserActionTypes.USER_SETINFO: {
			return {
				...state,
				...(action.payload as IUser),
			};
		}
		case UserActionTypes.USER_LOGOUT: {
			return { ...initialUserState, isAuth: false };
		}
		default:
			return state;
	}
}
