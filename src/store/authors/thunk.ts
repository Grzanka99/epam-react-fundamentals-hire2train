import { Dispatch } from 'redux';
import { IAuthor, IState } from 'types/state.interface';
import { authorsAdd, authorsRemove } from './actionCreators';
import { addAuthorToAPI, deleteAuthorFromAPI } from './services';

export const thunkAuthorRemove =
	(id: string) => async (dispatch: Dispatch, getState: () => IState) => {
		const result = await deleteAuthorFromAPI(id, getState().user.token);
		if (result) {
			dispatch(authorsRemove(id));
		}
	};

export const thunkAuthorAdd =
	({ name }: IAuthor) =>
	async (dispatch: Dispatch, getState: () => IState) => {
		const result = await addAuthorToAPI({ name }, getState().user.token);
		if (result) {
			dispatch(authorsAdd({ name }));
		}
	};
