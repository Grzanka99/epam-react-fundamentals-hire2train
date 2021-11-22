import { ENGLISH } from 'helpers/translations/english';
import { POLISH } from 'helpers/translations/polish';

export const API = 'http://localhost:3000';

export enum Lang {
	EN = 'en',
	PL = 'pl',
}

export const translate = (lang: Lang): typeof ENGLISH => {
	switch (lang) {
		case Lang.EN:
			return ENGLISH;
		case Lang.PL:
			return POLISH;
		default:
			return ENGLISH;
	}
};
