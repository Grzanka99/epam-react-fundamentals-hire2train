import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from 'services/user-api.service';
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
		builder.addMatcher(userApi.endpoints.logout.matchFulfilled, userLogout);
		builder.addMatcher(userApi.endpoints.login.matchFulfilled, userLogin);
		builder.addMatcher(userApi.endpoints.userInfo.matchFulfilled, userSetInfo);
	},
});

export default userReducer;
