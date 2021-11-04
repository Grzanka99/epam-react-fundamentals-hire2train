import { BUTTON, PLACEHOLDER } from '../../../../constants';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

import './SearchBar.scss';

const SearchBar = () => (
	<div className='search-bar'>
		<Input placeholderText={PLACEHOLDER.SEARCH} />
		<Button buttonText={BUTTON.SEARCH} />
	</div>
);

export default SearchBar;
