import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Button.scss';
import { IButtonProps } from 'types/props.interface';

const Button = ({ buttonText, onClick, type, pathTo }: IButtonProps) =>
	pathTo ? (
		<Link to={pathTo} onClick={onClick} className='common-button'>
			{buttonText}
		</Link>
	) : (
		<button onClick={onClick} className='common-button' type={type ?? 'button'}>
			{buttonText}
		</button>
	);

Button.propTypes = {
	buttonText: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	type: PropTypes.string,
	pathTo: PropTypes.string,
};

export default Button;
