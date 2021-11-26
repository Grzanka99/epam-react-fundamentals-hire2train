import { Dispatch } from 'redux';
import {
	authorsServiceAddAuthor,
	authorsServiceDeleteAuthor,
} from 'services/authors.service';
import { IAuthor } from 'types/state.interface';

import { authorsAdd, authorsRemove } from './actionCreators';

export const thunkAuthorRemove = (id: string) => async (dispatch: Dispatch) => {
	try {
		await authorsServiceDeleteAuthor(id);
		dispatch(authorsRemove(id));
	} catch (error) {
		console.log(error);
		alert('Something went wrong while deleting author!');
	}
};

export const thunkAuthorAdd =
	({ name }: IAuthor) =>
	async (dispatch: Dispatch) => {
		try {
			const result = await authorsServiceAddAuthor({ name });
			dispatch(authorsAdd({ id: result.id, name: result.name }));
		} catch (error) {
			console.log(error);
			alert('Something went wrong while creating author!');
		}
	};
