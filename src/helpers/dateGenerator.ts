const dateGenerator = () => {
	const nowis = new Date();
	return `${nowis.getDate()}/${nowis.getMonth()}/${nowis.getFullYear()}`;
};

export default dateGenerator;
