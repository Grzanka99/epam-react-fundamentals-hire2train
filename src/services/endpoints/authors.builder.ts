import { IResponse } from 'types/response.interface';
import { IAuthor, ICreateAuthor } from 'types/state.interface';
import { api } from 'services/api.service';

export const authorsEndpoints = api.injectEndpoints({
	endpoints: (builder) => ({
		loadAuthors: builder.query<IResponse<IAuthor[]>, void>({
			query: () => ({
				url: 'authors/all',
			}),
		}),
		addAuthor: builder.mutation<IResponse<IAuthor>, ICreateAuthor>({
			query: (body) => ({
				url: 'authors/add',
				method: 'POST',
				body,
			}),
		}),
		removeAuthor: builder.mutation<IResponse<string>, string>({
			query: (id) => ({
				url: `authors/${id}`,
				method: 'DELETE',
			}),
			transformResponse: (response: IResponse<string>, _meta, arg) => ({
				...response,
				result: arg,
			}),
		}),
	}),
	overrideExisting: true,
});

export const {
	useLazyLoadAuthorsQuery,
	useRemoveAuthorMutation,
	useAddAuthorMutation,
} = authorsEndpoints;
