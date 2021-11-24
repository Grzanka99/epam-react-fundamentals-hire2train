import { ICourse } from 'types/state.interface';

const fuzzySearch = (searchPhrase: string, str: string) => {
	const strLen = str.length;
	const searchPhraseLen = searchPhrase.length;

	if (searchPhraseLen > strLen) return false;
	if (searchPhraseLen === strLen) return searchPhrase === str;

	forLoop: for (let i = 0, j = 0; i < searchPhraseLen; i++) {
		const searchPhraseChar = searchPhrase.charCodeAt(i);
		while (j < strLen) {
			if (str.charCodeAt(j++) === searchPhraseChar) {
				continue forLoop;
			}
		}
		return false;
	}
	return true;
};

const finder = (current: ICourse, searchPhrase: string) =>
	!searchPhrase
		? true
		: fuzzySearch(searchPhrase.toLowerCase(), current.title.toLowerCase()) ||
		  (current.id &&
				fuzzySearch(searchPhrase.toLowerCase(), current.id.toLowerCase()));

export default finder;
