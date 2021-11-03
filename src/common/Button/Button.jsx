import './Button.scss';

const Button = ({ buttonText, onClick }) => (
	<button onClick={onClick} className='common-button'>
		{buttonText}
	</button>
);

export default Button;
