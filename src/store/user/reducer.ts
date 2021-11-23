import { setLocalStorageOnLogin } from 'components/Login/helpers';
import { IAction } from 'types/action.interface';
import { Role } from 'types/common.enum';
import { ILocalStorageKeys } from 'types/common.interface';
import { IUser } from 'types/state.interface';
import { UserActionTypes } from './actionTypes';

const initialUserState: IUser = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: Role.None,
};

export function userReducer(
	state = initialUserState,
	action: IAction<UserActionTypes, IUser>
): IUser {
	switch (action.type) {
		case UserActionTypes.USER_LOGIN: {
			const newData = {
				...state,
				...action.payload,
			};

			setLocalStorageOnLogin(newData as ILocalStorageKeys);

			return {
				...newData,
				isAuth: true,
			};
		}
		case UserActionTypes.USER_LOGOUT: {
			localStorage.clear();
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: Role.None,
			};
		}
		default:
			return state;
	}
}
