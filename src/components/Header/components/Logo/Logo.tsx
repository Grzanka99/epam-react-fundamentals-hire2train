import { FC } from 'react';
import './Logo.scss';

const Logo: FC = () => (
	<img
		src='https://picsum.photos/500/200'
		alt='some random thing'
		className='header-logo'
	/>
);

export default Logo;
