const pipeDuration = (v) => {
	const minutes = v % 60;
	const hours = Math.floor(v / 60);

	return `${hours > 9 ? hours : `0${hours}`}:${
		minutes > 9 ? minutes : `0${minutes}`
	} hours`;
};

export default pipeDuration;
