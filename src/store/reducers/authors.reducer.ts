import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { thunkAuthorRemove, thunkAuthorAdd } from 'store/thunks/authors.thunk';
import { IAuthor } from 'types/state.interface';

const initialState: IAuthor[] = [];

const authorsReducer = createSlice({
	name: 'authorsStore',
	initialState,
	reducers: {
		addAuthor: (state, action: PayloadAction<IAuthor[] | IAuthor>) => {
			const payload: IAuthor[] | IAuthor = action.payload;
			const newAuthors: IAuthor[] = Array.isArray(payload)
				? payload
				: [payload];

			return [...state, ...newAuthors];
		},
		removeAuthor: (state, action: PayloadAction<string>) =>
			state.filter((author) => author.id !== action.payload),
		cleanAuthors: () => [],
	},
	extraReducers: (builder) => {
		builder.addCase(thunkAuthorRemove.fulfilled, (state, action) => {
			console.log(action);
			// @ts-ignore
			state.filter((author) => author.id !== action.payload);
		});
		builder.addCase(thunkAuthorAdd.fulfilled, (state, action) => {
			console.log(action);
			// @ts-ignore
			state.concat(action.payload);
		});
	},
});

export default authorsReducer;
