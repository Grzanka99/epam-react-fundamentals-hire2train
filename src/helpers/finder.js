const fuzzySearch = (searchPhrase, str) => {
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

const finder = (curr, sp) =>
	!sp
		? true
		: fuzzySearch(sp.toLowerCase(), curr.title.toLowerCase()) ||
		  fuzzySearch(sp.toLowerCase(), curr.id.toLowerCase());

export default finder;
