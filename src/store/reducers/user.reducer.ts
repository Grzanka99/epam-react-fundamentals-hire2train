import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	thunkGetCurrentUser,
	thunkUserLogin,
	thunkUserLogout,
} from 'store/thunks/user.thunk';
import { Role } from 'types/common.enum';
import { IUser } from 'types/state.interface';

const initialUserState: IUser = {
	isAuth: !!localStorage.getItem('token'),
	name: '',
	email: '',
	token: '',
	role: Role.None,
};

const userLogin = (state: IUser, action: PayloadAction<string | any>) => ({
	...state,
	isAuth: true,
	token: action.payload,
});

const userSetInfo = (state: IUser, action: PayloadAction<IUser | any>) => ({
	...state,
	...action.payload,
});

const userLogout = (state: IUser) => ({
	...state,
	isAuth: false,
	token: '',
});

const userReducer = createSlice({
	name: 'userStore',
	initialState: initialUserState,
	reducers: { userLogin, userLogout, userSetInfo },
	extraReducers: (builder) => {
		builder.addCase(thunkUserLogin.fulfilled, userLogin);
		builder.addCase(thunkUserLogout.fulfilled, userLogout);
		builder.addCase(thunkGetCurrentUser.fulfilled, userSetInfo);
	},
});

export default userReducer;
