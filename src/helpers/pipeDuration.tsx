const pipeDuration = (v: number) => {
	const minutes = v % 60;
	const hours = Math.floor(v / 60);

	return (
		<span>
			<span className='hours-span'>
				{hours > 9 ? hours : `0${hours}`}:
				{minutes > 9 ? minutes : `0${minutes}`}
			</span>
			&nbsp;hours
		</span>
	);
};

export default pipeDuration;
