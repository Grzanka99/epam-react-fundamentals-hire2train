import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Button.scss';
import { IButtonProps } from 'types/props.interface';

const Button = ({
	buttonText,
	onClick,
	type,
	pathTo,
	children,
}: IButtonProps) =>
	pathTo ? (
		<Link
			to={pathTo}
			onClick={onClick}
			className='common-button'
			data-children={!!children}
		>
			{children ?? buttonText}
		</Link>
	) : (
		<button
			onClick={onClick}
			className='common-button'
			type={type ?? 'button'}
			data-children={!!children}
		>
			{children ?? buttonText}
		</button>
	);

Button.propTypes = {
	buttonText: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.string,
	pathTo: PropTypes.string,
	children: PropTypes.node,
};

export default Button;
