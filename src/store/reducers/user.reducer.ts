import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'services/api.service';
import { Role } from 'types/common.enum';
import { IUserGetInfo, IUserLoginResponse } from 'types/response.interface';
import { IUser } from 'types/state.interface';

const initialUserState: IUser = {
	isAuth: !!localStorage.getItem('token'),
	name: '',
	email: '',
	token: String(localStorage.getItem('token') || ''),
	role: Role.None,
};

const userLogin = (state: IUser, action: PayloadAction<IUserLoginResponse>) => {
	localStorage.setItem('token', action.payload.result);

	return {
		...state,
		isAuth: true,
		token: action.payload.result,
	};
};

const userSetInfo = (
	state: IUser,
	action: PayloadAction<IUserGetInfo | any>
) => ({
	...state,
	...action.payload.result,
});

const userSetInfoFailed = (state: IUser) => ({
	...state,
	isAuth: false,
	token: '',
});

const userLogout = () => {
	localStorage.clear();
	return {
		...initialUserState,
		isAuth: false,
		token: '',
	};
};

const userReducer = createSlice({
	name: 'userStore',
	initialState: initialUserState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(api.endpoints.logout.matchFulfilled, userLogout);
		builder.addMatcher(api.endpoints.login.matchFulfilled, userLogin);
		builder.addMatcher(api.endpoints.userInfo.matchFulfilled, userSetInfo);
		builder.addMatcher(api.endpoints.userInfo.matchRejected, userSetInfoFailed);
	},
});

export default userReducer;
