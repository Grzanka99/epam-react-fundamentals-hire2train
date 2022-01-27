import { createAsyncThunk } from '@reduxjs/toolkit';
import { appServiceGetAuthors } from 'services/app.service';
import {
	authorsServiceAddAuthor,
	authorsServiceDeleteAuthor,
} from 'services/authors.service';
import { authorsActions } from 'store';
import { IAuthor, ICreateAuthor } from 'types/state.interface';

export enum AuthorsAsync {
	REMOVE = 'authors/remove',
	CREATE = 'authors/add',
	LOAD = 'authors/load',
}

export const thunkAuthorRemove = createAsyncThunk<string | false, string>(
	AuthorsAsync.REMOVE,
	async (id: string) => {
		try {
			await authorsServiceDeleteAuthor(id);
			return id;
		} catch (error) {
			alert('Something went wrong while removing author');
			return false;
		}
	}
);

export const thunkAuthorAdd = createAsyncThunk<IAuthor | false, ICreateAuthor>(
	AuthorsAsync.CREATE,
	async ({ name }: ICreateAuthor) => {
		try {
			const result = await authorsServiceAddAuthor({ name });
			return { ...result };
		} catch (error) {
			console.log(error);
			return false;
		}
	}
);

export const thunkLoadAuthors = createAsyncThunk<IAuthor[] | false, void>(
	AuthorsAsync.LOAD,
	async () => {
		try {
			const result = await appServiceGetAuthors();
			authorsActions.cleanAuthors();

			return result.map((single) => ({ ...single }));
		} catch (error) {
			console.log(error);
			return false;
		}
	}
);
