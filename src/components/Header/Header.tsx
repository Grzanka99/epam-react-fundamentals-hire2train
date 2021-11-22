import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'common/Button/Button';
import Logo from './components/Logo/Logo';

import './Header.scss';
import { userLogout } from 'store/user/actionCreators';

import { IState, IUser } from 'types/state.interface';

const Header = () => {
	const navigate = useNavigate();
	const user: IUser = useSelector((state: IState) => state.user);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(userLogout());
		navigate('/login');
	};

	return (
		<header className='header'>
			<Logo />
			{!!user.name && (
				<div className='header__right'>
					<span className='header__right__user'>{user.name}</span>
					<Button buttonText='Logout' onClick={handleLogout} />
				</div>
			)}
		</header>
	);
};

export default Header;
