import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'helpers/constants';
import { IUserRegisterData } from 'types/common.interface';
import { IUserLoginResponse } from 'types/response.interface';
import { IUser } from 'types/state.interface';

interface LoginRequest {
	readonly email: string;
	readonly password: string;
}

export const userApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: API,
		prepareHeaders: (headers) => headers,
	}),
	endpoints: (builder) => ({
		login: builder.mutation<IUserLoginResponse, LoginRequest>({
			query: (creadentials) => ({
				url: 'login',
				method: 'POST',
				body: creadentials,
			}),
		}),
		logout: builder.mutation<true | undefined, string | null>({
			query: (token) => ({
				url: 'logout',
				method: 'DELETE',
				headers: {
					Authorization: token || '',
				},
			}),
		}),
		register: builder.mutation<any, IUserRegisterData>({
			query: (newUser) => ({
				url: 'register',
				method: 'POST',
				body: newUser,
			}),
		}),
		userInfo: builder.query<IUser, string | null>({
			query: (token) => ({
				url: 'users/me',
				headers: {
					Authorization: token || '',
				},
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useUserInfoQuery,
	useLogoutMutation,
	useRegisterMutation,
} = userApi;
