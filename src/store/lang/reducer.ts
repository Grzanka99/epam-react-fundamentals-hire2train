import { IAction } from 'types/action.interface';

import { LangActionTypes } from './actionTypes';

export function langReducer(
	state = 'en',
	action: IAction<LangActionTypes, string>
) {
	switch (action.type) {
		case LangActionTypes.SET_LANG:
			return action.payload;
		default:
			return state;
	}
}
