import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';

const Header = () => (
	<header>
		<Logo />
		Cezary
		<Button buttonText='Logout' />
	</header>
);

export default Header;
