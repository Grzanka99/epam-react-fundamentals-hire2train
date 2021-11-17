import PropTypes from 'prop-types';
import { IInputProps } from 'types/props.interface';

import './Input.scss';

const Input = ({
	labelText,
	placeholderText,
	onChange,
	inputType,
	min,
	value,
	required,
}: IInputProps) => (
	<label className='common-input__label'>
		<span className='common-input__label--text'>{labelText}</span>
		<input
			className='common-input'
			type={inputType ?? 'text'}
			placeholder={placeholderText}
			onChange={onChange}
			min={min}
			value={value}
			required={required}
		/>
	</label>
);

Input.propTypes = {
	labelText: PropTypes.string,
	placeholderText: PropTypes.string,
	onChange: PropTypes.func,
	inputType: PropTypes.string,
	min: PropTypes.number,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	required: PropTypes.bool,
};

export default Input;
