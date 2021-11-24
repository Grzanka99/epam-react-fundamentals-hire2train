import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import { translate } from 'helpers/constants';
import { useState, useCallback, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userServiceRegister } from 'services/user.service';
import { getLang } from 'store/selectors';

import './Registration.scss';

const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const lang = useSelector(getLang);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();
			const res = await userServiceRegister({
				name,
				email,
				password,
			});

			if (!res) {
				alert('Wrong data or email is already taken');
				return;
			}

			alert('User created succesful');
			navigate('/login');
		},
		[name, email, password, navigate]
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
			<h1>{translate(lang).TITLE.REGISTRATION}</h1>
			<Input
				labelText={translate(lang).LABEL.USERNAME}
				value={name}
				onChange={handleNameChange}
			/>
			<Input
				labelText={translate(lang).LABEL.EMAIL}
				value={email}
				onChange={handleEmailChange}
			/>
			<Input
				labelText={translate(lang).LABEL.PASSWORD}
				value={password}
				onChange={handlePasswordChange}
				inputType='password'
			/>
			<Button buttonText={translate(lang).BUTTON.REGISTRATION} type='submit' />
			<p>
				{translate(lang).COMMON.ACCOUNT_EXISTS}{' '}
				<Link to='/login'>{translate(lang).LINK.LOGIN}</Link>
			</p>
		</form>
	);
};

export default Registration;
