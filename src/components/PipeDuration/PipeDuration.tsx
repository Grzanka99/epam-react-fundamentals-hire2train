import PropTypes from 'prop-types';
import { translate } from 'helpers/constants';
import pipeDuration from 'helpers/pipeDuration';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getLang } from 'store/selectors';
import { IPipeDuration } from 'types/props.interface';

export const PipeDuration = ({ time }: { time: number }) => {
	const [duration, setDuration] = useState({} as IPipeDuration);

	const lang = useSelector(getLang);

	useEffect(() => {
		const objectTime = pipeDuration(time);
		setDuration(objectTime);
	}, [time]);

	return (
		<span>
			<span className='hours-span'>
				{duration.hours}:{duration.minutes}
			</span>
			&nbsp;{translate(lang).COMMON.HOURS}
		</span>
	);
};

PipeDuration.propTypes = {
	time: PropTypes.number.isRequired,
};
