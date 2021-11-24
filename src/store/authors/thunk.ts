import { Dispatch } from 'redux';
import {
	authorsServiceAddAuthor,
	authorsServiceDeleteAuthor,
} from 'services/authors.service';
import { IAuthor } from 'types/state.interface';
import { authorsAdd, authorsRemove } from './actionCreators';

export const thunkAuthorRemove = (id: string) => async (dispatch: Dispatch) => {
	const result = await authorsServiceDeleteAuthor(id);
	if (result) {
		dispatch(authorsRemove(id));
	}
};

export const thunkAuthorAdd =
	({ name }: IAuthor) =>
	async (dispatch: Dispatch) => {
		const result = await authorsServiceAddAuthor({ name });
		if (result) {
			dispatch(authorsAdd({ name }));
		}
	};
