import { IUserRegisterData } from 'types/common.interface';
import {
	ICreateUserResponse,
	IUserLoginResponse,
} from 'types/response.interface';
import { IUser } from 'types/state.interface';
import { api } from 'services/api.service';

interface LoginRequest {
	readonly email: string;
	readonly password: string;
}

export const userEndpoints = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<IUserLoginResponse, LoginRequest>({
			query: (creadentials) => ({
				url: 'login',
				method: 'POST',
				body: creadentials,
			}),
		}),
		logout: builder.mutation<true | undefined, void>({
			query: () => ({
				url: 'logout',
				method: 'DELETE',
			}),
		}),
		register: builder.mutation<ICreateUserResponse, IUserRegisterData>({
			query: (newUser) => ({
				url: 'register',
				method: 'POST',
				body: newUser,
			}),
		}),
		userInfo: builder.query<IUser, void>({
			query: () => ({ url: 'users/me' }),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useLazyUserInfoQuery,
} = userEndpoints;
