import PropTypes from 'prop-types';

import './Input.scss';

const Input = ({
	labelText,
	placeholderText,
	onChange,
	inputType,
	min,
	value,
	required,
}) => (
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
	value: PropTypes.string,
	required: PropTypes.bool,
};

export default Input;
