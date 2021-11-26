import { IAction } from 'types/action.interface';
import { IAuthor } from 'types/state.interface';

import { AuthorsActionTypes } from './actionTypes';

const initialAuthorsState: IAuthor[] = [];

export function authorsReducer(
	state = initialAuthorsState,
	action: IAction<AuthorsActionTypes, any>
) {
	switch (action.type) {
		case AuthorsActionTypes.AUTHORS_ADD: {
			return [...state, ...action.payload];
		}
		case AuthorsActionTypes.AUTHORS_REMOVE:
			return state.filter((author) => author.id !== action.payload.id);
		case AuthorsActionTypes.AUTHORS_CLEAN:
			return [];
		default:
			return state;
	}
}
