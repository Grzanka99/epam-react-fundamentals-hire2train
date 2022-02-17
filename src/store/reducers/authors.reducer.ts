import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authorsEndpoints } from 'services/endpoints/authors.builder';
import { IResponse } from 'types/response.interface';
import { IAuthor } from 'types/state.interface';

const initialState: IAuthor[] = [];

const addAuthor = (
	state: IAuthor[],
	action: PayloadAction<IResponse<IAuthor | IAuthor[] | false>>
) => {
	const { result } = action.payload;
	if (result === false) return state;

	const newAuthors = Array.isArray(result) ? result : [result];
	return [...state, ...newAuthors];
};

const loadAuthors = (
	_state: IAuthor[],
	action: PayloadAction<IResponse<IAuthor[]>>
) => [...action.payload.result];

const removeAuthor = (
	state: IAuthor[],
	action: PayloadAction<IResponse<string | false>>
) => {
	if (!action.payload.result) return state;
	return state.filter((author) => author.id !== action.payload.result);
};

const authorsReducer = createSlice({
	name: 'authorsStore',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			authorsEndpoints.endpoints.removeAuthor.matchFulfilled,
			removeAuthor
		);
		builder.addMatcher(
			authorsEndpoints.endpoints.addAuthor.matchFulfilled,
			addAuthor
		);
		builder.addMatcher(
			authorsEndpoints.endpoints.loadAuthors.matchFulfilled,
			loadAuthors
		);
	},
});

export default authorsReducer;
