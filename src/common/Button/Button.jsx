import './Button.scss';

const Button = ({ buttonText, onClick, type }) => (
	<button onClick={onClick} className='common-button' type={type ?? 'button'}>
		{buttonText}
	</button>
);

export default Button;
