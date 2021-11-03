const Input = ({ labelText, placeholderText, onChange, inputType }) => (
	<label>
		{labelText}
		<input type={inputType} placeholder={placeholderText} onChange={onChange} />
	</label>
);

export default Input;
