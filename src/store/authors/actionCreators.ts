import { IAction } from 'types/action.interface';
import { IAuthor } from 'types/state.interface';

import { AuthorsActionTypes } from './actionTypes';

export function authorsAdd(authors: IAuthor[] | IAuthor) {
	const payload: IAuthor[] = Array.isArray(authors) ? authors : [authors];

	return {
		type: AuthorsActionTypes.AUTHORS_ADD,
		payload,
	};
}

export const authorsRemove = (
	id: string
): IAction<AuthorsActionTypes.AUTHORS_REMOVE, string> => ({
	type: AuthorsActionTypes.AUTHORS_REMOVE,
	payload: id,
});

export const authorsClean = (): IAction<
	AuthorsActionTypes.AUTHORS_CLEAN,
	null
> => ({
	type: AuthorsActionTypes.AUTHORS_CLEAN,
	payload: null,
});
