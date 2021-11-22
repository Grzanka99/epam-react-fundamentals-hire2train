import axios from 'axios';
import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import { API } from 'helpers/constants';
import { useState, useCallback, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Registration.scss';

const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			let result;

			try {
				result = await axios.post(`${API}/register`, {
					name,
					email,
					password,
				});
			} catch (error: ErrorEvent | any | unknown) {
				if (error) {
					result = error.response;
					console.log(result.data);
					alert('Wrong data or email is already taken');
				}
				return;
			}

			alert('User created succesful');
			console.log(result.data);
			navigate('/login');
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[name, email, password]
	);

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
		setName(e.target.value);
	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	return (
		<form
			action='/'
			onSubmit={handleSubmit}
			className='flex column h100 center'
		>
			<h1>Registration</h1>
			<Input labelText='Name' value={name} onChange={handleNameChange} />
			<Input labelText='Email' value={email} onChange={handleEmailChange} />
			<Input
				labelText='Password'
				value={password}
				onChange={handlePasswordChange}
				inputType='password'
			/>
			<Button buttonText='Registration' type='submit' />
			<p>
				If you already have an account you can <Link to='/login'>Login</Link>
			</p>
		</form>
	);
};

export default Registration;
