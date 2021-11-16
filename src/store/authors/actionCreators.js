import * as actions from './actionTypes';

export function authorsAdd(author) {
	let payload = [];

	if (Array.isArray(author)) {
		payload = author;
	} else {
		payload.push(author);
	}

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
