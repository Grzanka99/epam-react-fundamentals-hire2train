import { LangActionTypes } from './actionTypes';

export function languageSet(lang: string) {
	return {
		type: LangActionTypes.SET_LANG,
		payload: lang,
	};
}
