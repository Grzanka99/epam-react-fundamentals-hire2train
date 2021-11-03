import './Input.scss';

const Input = ({ labelText, placeholderText, onChange, inputType, min }) => (
	<label className='common-input__label'>
		<span className='common-input__label--text'>{labelText}</span>
		<input
			className='common-input'
			type={inputType}
			placeholder={placeholderText}
			onChange={onChange}
			min={min}
		/>
	</label>
);

export default Input;
