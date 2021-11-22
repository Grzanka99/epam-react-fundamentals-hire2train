import PropTypes from 'prop-types';

import { ChangeEvent, useState } from 'react';
import { ISearchBarProps } from 'types/props.interface';
import { ICourse } from 'types/state.interface';

import Button from 'common/Button/Button';
import Input from 'common/Input/Input';

import { translate } from 'helpers/constants';
import finder from 'helpers/finder';

import './SearchBar.scss';
import { useSelector } from 'react-redux';
import { getLang } from 'store/selectors';

const SearchBar = ({ searchIn, onFind }: ISearchBarProps<ICourse>) => {
	const [searchPhrase, setSearchPhrase] = useState('');

	const lang = useSelector(getLang);

	const handleOnChange = (e: ChangeEvent) =>
		setSearchPhrase((e.target as HTMLInputElement).value);

	const handleSearch = () => {
		const found = searchIn.filter((el: ICourse) => finder(el, searchPhrase));
		onFind(found);
	};

	return (
		<div className='search-bar'>
			<Input
				placeholderText={translate(lang).PLACEHOLDER.SEARCH}
				value={searchPhrase}
				onChange={handleOnChange}
			/>
			<Button
				buttonText={translate(lang).BUTTON.SEARCH}
				onClick={handleSearch}
			/>
		</div>
	);
};

SearchBar.propTypes = {
	searchIn: PropTypes.array,
	onFind: PropTypes.func.isRequired,
};

export default SearchBar;
