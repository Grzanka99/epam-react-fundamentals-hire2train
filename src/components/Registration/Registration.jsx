import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './Registration.scss';

const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Submitted');
	};

	const handleNameChange = (e) => setName(e.target.value);
	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	return (
		<form
			action='/'
			onSubmit={handleSubmit}
			className='flex column registration'
		>
			<h1>Registration</h1>
			<Input labelText='Name' value={name} onChange={handleNameChange} />
			<Input labelText='Email' value={email} onChange={handleEmailChange} />
			<Input
				labelText='Password'
				value={password}
				onChange={handlePasswordChange}
			/>
			<Button buttonText='Registration' type='submit' />
			<p>
				If you already have an account you can <Link to='/login'>Login</Link>
			</p>
		</form>
	);
};

export default Registration;
