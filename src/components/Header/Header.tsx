import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'common/Button/Button';
import Logo from './components/Logo/Logo';

import './Header.scss';
import { userLogout } from 'store/user/actionCreators';

import { IState, IUser } from 'types/state.interface';
import { API, translate } from 'helpers/constants';
import { getLang } from 'store/selectors';
import axios from 'axios';

const Header = () => {
	const navigate = useNavigate();
	const user: IUser = useSelector((state: IState) => state.user);
	const dispatch = useDispatch();

	const lang = useSelector(getLang);

	const handleLogout = async () => {
		dispatch(userLogout());

		await axios.delete(`${API}/logout`, {
			headers: {
				Authorization: user.token,
			},
		});

		navigate('/login');
	};

	return (
		<header className='header'>
			<Logo />
			{!!user.name && (
				<div className='header__right'>
					<span className='header__right__user'>{user.name}</span>
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
