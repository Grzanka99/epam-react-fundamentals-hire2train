import { FC } from 'react';
import './Logo.scss';

const Logo: FC = () => (
	<img
		data-testid='logo'
		src='https://picsum.photos/500/200'
		alt='some random thing'
		className='header-logo'
	/>
);

export default Logo;
