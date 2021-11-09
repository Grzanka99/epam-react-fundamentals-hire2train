import Input from 'common/Input/Input';
import Button from 'common/Button/Button';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		console.log('submit');
	}, []);

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
