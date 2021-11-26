import { IAction } from 'types/action.interface';
import { IAuthor } from 'types/state.interface';

import { AuthorsActionTypes } from './actionTypes';

export function authorsAdd(authors: IAuthor) {
	const payload: IAuthor[] = Array.isArray(authors) ? authors : [authors];

	return {
		type: AuthorsActionTypes.AUTHORS_ADD,
		payload,
	};
}

export function authorsRemove(id: string) {
	return {
		type: AuthorsActionTypes.AUTHORS_REMOVE,
		payload: { id },
	};
}

export function authorsClean(): IAction<AuthorsActionTypes, null> {
	return {
		type: AuthorsActionTypes.AUTHORS_CLEAN,
		payload: null,
	};
}
