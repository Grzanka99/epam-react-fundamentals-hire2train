import { IResponse } from 'types/response.interface';
import { IAuthor, ICreateAuthor } from 'types/state.interface';
import { Builder } from 'services/api.service';

export const buildAuthorsEndpoints = (builder: Builder) => ({
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
	removeAuthor: builder.mutation<IResponse<any>, string>({
		query: (id) => ({
			url: `authors/${id}`,
			method: 'DELETE',
		}),
		transformResponse: (response: IResponse<string>, _meta, arg) => ({
			...response,
			result: arg,
		}),
	}),
});
