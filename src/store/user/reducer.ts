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
	action: any //IAction<UserActionTypes, IUser>
): IUser {
	switch (action.type) {
		case UserActionTypes.USER_LOGIN: {
			return {
				...state,
				isAuth: true,
				token: action.payload,
			};
		}
		case UserActionTypes.SET_USER: {
			return {
				...state,
				...action.payload,
			};
		}
		case UserActionTypes.USER_LOGOUT: {
			return { ...initialUserState };
		}
		default:
			return state;
	}
}
