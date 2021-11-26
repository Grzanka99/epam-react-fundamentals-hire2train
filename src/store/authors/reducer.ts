import { IAction } from 'types/action.interface';
import { IAuthor } from 'types/state.interface';

import { AuthorsActionTypes } from './actionTypes';

const initialAuthorsState: IAuthor[] = [];

export function authorsReducer(
	state = initialAuthorsState,
	action: IAction<AuthorsActionTypes, IAuthor[] | string>
) {
	switch (action.type) {
		case AuthorsActionTypes.AUTHORS_ADD: {
			return [...state, ...(action.payload as IAuthor[])];
		}
		case AuthorsActionTypes.AUTHORS_REMOVE:
			return state.filter(
				(author: IAuthor) => author.id !== (action.payload as string)
			);
		case AuthorsActionTypes.AUTHORS_CLEAN:
			return [];
		default:
			return state;
	}
}
