import { IAction } from 'types/action.interface';
import { IUser } from 'types/state.interface';
import { UserActionTypes } from './actionTypes';

const initialUserState: IUser = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export default function userReducer(
	state = initialUserState,
	action: IAction<UserActionTypes, IUser>
): IUser {
	switch (action.type) {
		case UserActionTypes.USER_LOGIN:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
			};
		case UserActionTypes.USER_LOGOUT: {
			localStorage.clear();
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		}
		default:
			return state;
	}
}
