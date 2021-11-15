import Input from 'common/Input/Input';
import Button from 'common/Button/Button';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from 'constants.js';
import { userLogin } from 'store/user/actionCreators';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			let result;

			try {
				result = await axios.post(`${API}/login`, {
					email,
					password,
				});
			} catch (error) {
				result = error.response;
				if (error.response.data.successful === false) {
					alert('Wrong username or password');
				}

				return;
			}

			dispatch(
				userLogin({
					token: result.data.result,
					name: result.data.user.name,
					email: result.data.user.email,
				})
			);

			navigate('/');
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[email, password]
	);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	return (
		<form
			action='/login'
			onSubmit={handleSubmit}
			className='flex column h100 center'
		>
			<h1>Login</h1>
			<Input labelText='Email' onChange={handleEmailChange} value={email} />
			<Input
				labelText='Password'
				onChange={handlePasswordChange}
				value={password}
				inputType='password'
			/>
			<Button buttonText='Login' type='submit' />
			<p>
				If you not have an account you can{' '}
				<Link to='/registration'>Registration</Link>
			</p>
		</form>
	);
};

export default Login;
