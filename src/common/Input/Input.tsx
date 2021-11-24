import { FC } from 'react';
import { IInputProps } from 'types/props.interface';

import './Input.scss';

const Input: FC<IInputProps> = ({
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

export default Input;
