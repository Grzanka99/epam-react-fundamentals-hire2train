import { FC, useEffect, useState } from 'react';

import { translate } from 'helpers/constants';
import pipeDuration from 'helpers/pipeDuration';
import { useSelector } from 'react-redux';
import { getLang } from 'store/selectors';
import { IPipeDuration } from 'types/props.interface';

export const PipeDuration: FC<{ time: number }> = ({ time }) => {
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
