import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import './SearchBar.scss';

const SearchBar = () => (
	<div className='search-bar'>
		<Input placeholderText='Enter course name...' />
		<Button buttonText='Search' />
	</div>
);

export default SearchBar;
