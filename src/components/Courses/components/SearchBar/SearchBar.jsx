import { useState } from 'react';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

import { BUTTON, PLACEHOLDER } from '../../../../constants';
import finder from '../../../../helpers/finder';

import './SearchBar.scss';

const SearchBar = ({ searchIn, onFind }) => {
	const [searchPhrase, setSearchPhrase] = useState('');

	const handleOnChange = (e) => setSearchPhrase(e.target.value);

	const handleSearch = () => {
		const found = searchIn.filter((el) => finder(el, searchPhrase));
		onFind(found);
	};

	return (
		<div className='search-bar'>
			<Input
				placeholderText={PLACEHOLDER.SEARCH}
				value={searchPhrase}
				onChange={handleOnChange}
			/>
			<Button buttonText={BUTTON.SEARCH} onClick={handleSearch} />
		</div>
	);
};

export default SearchBar;
