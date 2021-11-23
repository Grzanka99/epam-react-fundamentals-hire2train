import { IPipeDuration } from 'types/props.interface';

const pipeDuration = (v: number): IPipeDuration => {
	const minutes = v % 60;
	const hours = Math.floor(v / 60);

	return {
		hours: hours > 9 ? String(hours) : `0${hours}`,
		minutes: minutes > 9 ? String(minutes) : `0${minutes}`,
	};
};

export default pipeDuration;
