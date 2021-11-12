import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './Header.scss';

const Header = ({ user, onLogout }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		onLogout.setUser('');
		onLogout.setToken('');

		localStorage.removeItem('user');
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<header className='header'>
			<Logo />
			{!!user && (
				<div className='header__right'>
					<span className='header__right__user'>{user}</span>
					<Button buttonText='Logout' onClick={handleLogout} />
				</div>
			)}
		</header>
	);
};

export default Header;
