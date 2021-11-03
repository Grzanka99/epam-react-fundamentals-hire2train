import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './Header.scss';

const Header = ({ changeView }) => (
	<header className='header'>
		<Logo />
		<div className='header__right'>
			<span className='header__right__user'>Cezary</span>
			<Button buttonText='Logout' onClick={changeView} />
		</div>
	</header>
);

export default Header;
