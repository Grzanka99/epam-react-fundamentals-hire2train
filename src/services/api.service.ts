import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API } from 'helpers/constants';
import { IState } from 'types/state.interface';

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
	endpoints: () => ({}),
});
