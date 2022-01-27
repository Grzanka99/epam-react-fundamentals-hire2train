import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	thunkAuthorRemove,
	thunkAuthorAdd,
	thunkAuthorsLoad,
} from 'store/thunks/authors.thunk';
import { IAuthor } from 'types/state.interface';

const initialState: IAuthor[] = [];

const addAuthor = (
	state: IAuthor[],
	action: PayloadAction<IAuthor | IAuthor[] | false>
) => {
	if (action.payload === false) return state;
	const { payload } = action;

	const newAuthors = Array.isArray(payload) ? payload : [payload];
	return [...state, ...newAuthors];
};

const removeAuthor = (
	state: IAuthor[],
	action: PayloadAction<string | false>
) => {
	if (!action.payload) return state;
	return state.filter((author) => author.id !== action.payload);
};

const authorsReducer = createSlice({
	name: 'authorsStore',
	initialState,
	reducers: {
		addAuthor,
		removeAuthor,
		cleanAuthors: () => [],
	},
	extraReducers: (builder) => {
		builder.addCase(thunkAuthorAdd.fulfilled, addAuthor);
		builder.addCase(thunkAuthorRemove.fulfilled, removeAuthor);
		builder.addCase(thunkAuthorsLoad.fulfilled, addAuthor);
	},
});

export default authorsReducer;
