import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './Header.scss';

const Header = () => (
	<header className='header'>
		<Logo />
		<div className='header__right'>
			<span className='header__right__user'>Cezary</span>
			<Button buttonText='Logout' />
		</div>
	</header>
);

export default Header;
