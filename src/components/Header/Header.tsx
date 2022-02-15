import { FC } from 'react';

import Button from 'common/Button/Button';
import { translate } from 'helpers/constants';
import { useSelector } from 'react-redux';
import { getToken, getUser } from 'store/selectors/user.selectors';
import { getLang } from 'store/selectors/lang.selectors';

import Logo from './components/Logo/Logo';

import './Header.scss';
import { useLogoutMutation } from 'services/user-api.service';

const Header: FC = () => {
	const user = useSelector(getUser);

	const lang = useSelector(getLang);

	const [logout] = useLogoutMutation();
	const token = useSelector(getToken);

	const handleLogout = () => {
		logout(token);
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
