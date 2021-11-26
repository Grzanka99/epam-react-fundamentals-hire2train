import { ChangeEvent, FC, useCallback, useState } from 'react';

import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import { translate } from 'helpers/constants';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLang } from 'store/selectors';
import { thunkUserLogin } from 'store/user/thunk';

const Login: FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

	const lang = useSelector(getLang);

	const handleSubmit = useCallback(
		(e) => {
			e.preventDefault();
			dispatch(thunkUserLogin({ email, password }));
		},
		[email, password, dispatch]
	);

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	return (
		<form
			action='/login'
			onSubmit={handleSubmit}
			className='flex column h100 center'
		>
			<h1>{translate(lang).COMMON.LOGIN}</h1>
			<Input
				labelText={translate(lang).LABEL.EMAIL}
				onChange={handleEmailChange}
				value={email}
			/>
			<Input
				labelText={translate(lang).LABEL.PASSWORD}
				onChange={handlePasswordChange}
				value={password}
				inputType='password'
			/>
			<Button buttonText={translate(lang).BUTTON.LOGIN} type='submit' />
			<p>
				{translate(lang).COMMON.NO_ACCOUNT}{' '}
				<Link to='/registration'>{translate(lang).LINK.REGISTRATION}</Link>
			</p>
		</form>
	);
};

export default Login;
