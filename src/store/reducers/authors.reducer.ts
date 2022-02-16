import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'services/api.service';
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
		builder.addMatcher(api.endpoints.removeAuthor.matchFulfilled, removeAuthor);
		builder.addMatcher(api.endpoints.addAuthor.matchFulfilled, addAuthor);
		builder.addMatcher(api.endpoints.loadAuthors.matchFulfilled, loadAuthors);
	},
});

export default authorsReducer;
