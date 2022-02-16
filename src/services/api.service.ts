import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {
	BaseQueryFn,
	createApi,
	FetchArgs,
	fetchBaseQuery,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { API } from 'helpers/constants';
import { IState } from 'types/state.interface';
import { buildAuthorsEndpoints } from './endpoints/authors.builder';
import { buildCoursesEndpoints } from './endpoints/courses.builder';
import { buildUserEndpoints } from './endpoints/user.builder';

export type BaseQueryFnType = BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError,
	{},
	FetchBaseQueryMeta
>;

export type Builder = EndpointBuilder<BaseQueryFnType, never, 'api'>;

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: API,
		prepareHeaders: (headers, { getState }) => {
			const { token } = (getState() as IState).user;
			if (token) {
				headers.set('Authorization', token);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		...buildUserEndpoints(builder),
		...buildAuthorsEndpoints(builder),
		...buildCoursesEndpoints(builder),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useLazyUserInfoQuery,
	useLazyLoadAuthorsQuery,
	useLazyLoadCoursesQuery,
	useRemoveAuthorMutation,
	useAddAuthorMutation,
} = api;
