import { ChangeEvent, FC, useState } from 'react';

import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import { translate } from 'helpers/constants';
import finder from 'helpers/finder';
import { useSelector } from 'react-redux';
import { getLang } from 'store/selectors';
import { ISearchBarProps } from 'types/props.interface';
import { ICourse } from 'types/state.interface';

import './SearchBar.scss';

const SearchBar: FC<ISearchBarProps<ICourse>> = ({ searchIn, onFind }) => {
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

export default SearchBar;
