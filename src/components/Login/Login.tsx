import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback, ChangeEvent } from 'react';

import Input from 'common/Input/Input';
import Button from 'common/Button/Button';
import { translate } from 'helpers/constants';
import { userLogin } from 'store/user/actionCreators';
import { getLang } from 'store/selectors';
import { setLocalStorageOnLogin } from './helpers';
import { Role } from 'types/common.enum';
import { getUserInfo, performLoginRequest } from 'store/services';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const lang = useSelector(getLang);

	const handleSubmit = useCallback(
		async (e) => {
			e.preventDefault();

			const result = await performLoginRequest(email, password);
			if (!result) return;
			const userInfo = await getUserInfo(result.data.result);

			setLocalStorageOnLogin({
				token: result.data.result,
				name: userInfo.name,
				role: userInfo.role || Role.None,
				email: userInfo.email,
			});

			dispatch(
				userLogin({
					token: result.data.result,
					name: userInfo.name,
					email: userInfo.email,
					role: userInfo.role,
				})
			);

			navigate('/course');
		},
		[email, password, dispatch, navigate]
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
