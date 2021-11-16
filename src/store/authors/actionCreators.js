import * as actions from './actionTypes';

export function authorsAdd(authors) {
	const payload = Array.isArray(authors) ? authors : [authors];

	return {
		type: actions.AUTHORS_ADD,
		payload,
	};
}

export function authorsRemove(id) {
	return {
		type: actions.AUTHORS_REMOVE,
		payload: { id },
	};
}
