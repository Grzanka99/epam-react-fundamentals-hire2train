import { createAsyncThunk } from '@reduxjs/toolkit';
import { appServiceGetAuthors } from 'services/app.service';
import { authorsServiceDeleteAuthor } from 'services/authors.service';

export enum AuthorsAsync {
	REMOVE = 'authors/remove',
	ADD = 'authors/add',
}

export const thunkAuthorRemove = createAsyncThunk(
	AuthorsAsync.REMOVE,
	async (id: string) => {
		try {
			await authorsServiceDeleteAuthor(id);
		} catch (error) {
			console.log(error);
			alert('Something went wrong while removing author');
		} finally {
			return id;
		}
	}
);

export const thunkAuthorAdd = createAsyncThunk(AuthorsAsync.ADD, async () => {
	try {
		const res = await appServiceGetAuthors();
		return res;
	} catch (error) {
		console.log(error);
	}
});
