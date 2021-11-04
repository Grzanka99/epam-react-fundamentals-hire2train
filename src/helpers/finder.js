const fzf = (sp, str) => {
	const hlen = str.length;
	const nlen = sp.length;

	if (nlen > hlen) return false;
	if (nlen === hlen) return sp === str;

	forLoop: for (let i = 0, j = 0; i < nlen; i++) {
		const nch = sp.charCodeAt(i);
		while (j < hlen) {
			if (str.charCodeAt(j++) === nch) {
				continue forLoop;
			}
		}
		return false;
	}
	return true;
};

const finder = (curr, sp) =>
	!sp ? true : fzf(sp, curr.title) || fzf(sp, curr.id);

export default finder;
