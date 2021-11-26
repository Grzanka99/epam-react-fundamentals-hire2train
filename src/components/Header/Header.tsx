import { useDispatch, useSelector } from 'react-redux';
import { FC } from 'react';

import Button from 'common/Button/Button';
import Logo from './components/Logo/Logo';

import { translate } from 'helpers/constants';

import { getLang, getUser } from 'store/selectors';
import { thunkUserLogout } from 'store/user/thunk';

import './Header.scss';

const Header: FC = () => {
	const user = useSelector(getUser);
	const dispatch = useDispatch();

	const lang = useSelector(getLang);

	const handleLogout = () => {
		dispatch(thunkUserLogout());
	};

	return (
		<header className='header'>
			<Logo />
			{(!!user.name || user.name === null) && (
				<div className='header__right'>
					<span className='header__right__user'>{String(user.name)}</span>
					<Button
						buttonText={translate(lang).BUTTON.LOGOUT}
						onClick={handleLogout}
					/>
				</div>
			)}
		</header>
	);
};

export default Header;
