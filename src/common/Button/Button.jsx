import { Link } from 'react-router-dom';

import 'common/Button/Button.scss';

const Button = ({ buttonText, onClick, type, pathTo }) =>
	pathTo ? (
		<Link to={pathTo} onClick={onClick} className='common-button'>
			{buttonText}
		</Link>
	) : (
		<button onClick={onClick} className='common-button' type={type ?? 'button'}>
			{buttonText}
		</button>
	);

export default Button;
