import * as actions from './actionTypes';

const initialAuthorsState = [];

export default function authorsReducer(state = initialAuthorsState, action) {
	switch (action.type) {
		case actions.AUTHORS_ADD: {
			return [...state, ...action.payload];
		}
		case actions.AUTHORS_REMOVE:
			return state.filter((author) => author.id !== action.payload.id);
		default:
			return state;
	}
}
