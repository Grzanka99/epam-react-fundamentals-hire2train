import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role } from 'types/common.enum';
import { IUser } from 'types/state.interface';

const initialUserState: IUser = {
	isAuth: !!localStorage.getItem('token'),
	name: '',
	email: '',
	token: '',
	role: Role.None,
};

const userReducer = createSlice({
	name: 'userStore',
	initialState: initialUserState,
	reducers: {
		userLogin: (state: IUser, action: PayloadAction<string>) => ({
			...state,
			isAuth: true,
			token: action.payload,
		}),
		userSetInfo: (state: IUser, action: PayloadAction<IUser>) => ({
			...state,
			...action.payload,
		}),
		userLogout: (state: IUser) => ({
			...state,
			isAuth: false,
			token: '',
		}),
	},
});

export default userReducer;
