import { FC } from 'react';

import { Link } from 'react-router-dom';
import { IButtonProps } from 'types/props.interface';

import './Button.scss';

const Button: FC<IButtonProps> = ({
	buttonText,
	onClick,
	type,
	pathTo,
	children,
	dataTestId,
}) =>
	pathTo ? (
		<Link
			to={pathTo}
			onClick={onClick}
			className='common-button'
			data-children={!!children}
			data-testid={dataTestId}
		>
			{children ?? buttonText}
		</Link>
	) : (
		<button
			onClick={onClick}
			className='common-button'
			type={type ?? 'button'}
			data-children={!!children}
			data-testid={dataTestId}
		>
			{children ?? buttonText}
		</button>
	);

export default Button;
