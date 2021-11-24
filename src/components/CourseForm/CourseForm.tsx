import { ChangeEvent, FormEventHandler, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Button from 'common/Button/Button';
import Input from 'common/Input/Input';

import dateGenerator from 'helpers/dateGenerator';

import { translate } from 'helpers/constants';

import './CourseForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { coursesAdd } from 'store/courses/actionCreators';
import { getAuthors, getLang } from 'store/selectors';
import { PipeDuration } from 'components/PipeDuration/PipeDuration';
import { thunkAuthorAdd } from 'store/authors/thunk';

const CreateCourse = () => {
	const [duration, setDuration] = useState(0);
	const [newAuthorName, setNewAuthorName] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const authors = useSelector(getAuthors);
	const [authorList, setAuthorsList] = useState(authors);
	const [currAuthors, setCurrAuthors] = useState([] as string[]);

	const dispatch = useDispatch();

	const lang = useSelector(getLang);

	// useNavigate replaced useHistory in react-router-dom v6
	const navigate = useNavigate();

	const handleCreateAuthor = useCallback(
		(newName) => () => {
			if (!newName) {
				alert('Author name cannot be empty');
				return;
			}
			const newID = uuidv4();
			const newAuthor = {
				name: newName,
				id: newID,
			};

			setAuthorsList([...authorList, newAuthor]);
			setNewAuthorName('');

			dispatch(thunkAuthorAdd(newAuthor));
		},
		[authorList, dispatch]
	);

	const validateData = () => {
		const errors = [];
		if (!title) errors.push('Title cannot be empty');
		if (!description) errors.push('Description cannot be empty');
		if (duration < 1) errors.push('Duration cannot be empty');
		if (!currAuthors.length) errors.push('You need to add atleast one author');

		errors.forEach((error) => alert(error));

		return !errors.length;
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (validateData()) {
			const newCourse = {
				id: uuidv4(),
				title,
				description,
				creationDate: dateGenerator(),
				duration,
				authors: currAuthors,
			};

			dispatch(coursesAdd([newCourse]));

			navigate('/', { replace: true });
		} else return;
	};

	const handleAuthorNameChange = (e: ChangeEvent<HTMLInputElement>) =>
		setNewAuthorName(e.target.value);

	const handleChangeDuration = (e: ChangeEvent<HTMLInputElement>) =>
		setDuration(Number(e.target.value) < 1 ? 1 : Number(e.target.value));

	const handleAddAuthor = (id: string) => () =>
		setCurrAuthors([...currAuthors, id]);

	const handleDeleteAuthor = (id: string) => () =>
		setCurrAuthors(currAuthors.filter((el) => el !== id));

	const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
		setTitle(e.target.value);

	const handleChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) =>
		setDescription(e.target.value);

	return (
		<form className='create-course' onSubmit={handleSubmit}>
			<div className='create-course__title'>
				<Input
					labelText='Title'
					value={title}
					onChange={handleChangeTitle}
					placeholderText={translate(lang).PLACEHOLDER.TITLE}
				/>
				<span className='flex center'>
					<Button
						buttonText={translate(lang).BUTTON.CANCEL}
						pathTo='/courses'
					/>
					<Button
						buttonText={translate(lang).BUTTON.CREATE_COURSE}
						type='submit'
					/>
				</span>
			</div>
			<label className='create-course__desc'>
				{translate(lang).COMMON.DESCRIPTION}
				<textarea
					name='description'
					id='description-input'
					cols={30}
					rows={30}
					placeholder={translate(lang).PLACEHOLDER.DESCRIPTION}
					value={description}
					onChange={handleChangeDescription}
				/>
			</label>
			<div className='create-course__authors'>
				<div className='create-course__authors__left'>
					<div className='create-course__authors__left__new-author'>
						<h3>{translate(lang).TITLE.ADD_AUTHOR}</h3>
						<Input
							labelText='Author name'
							value={newAuthorName}
							onChange={handleAuthorNameChange}
							placeholderText={translate(lang).PLACEHOLDER.AUTHOR}
						/>
						<Button
							buttonText={translate(lang).BUTTON.CREATE_AUTHOR}
							onClick={handleCreateAuthor(newAuthorName)}
						/>
					</div>
					<div className='create-course__authors__left__duration'>
						<h3>{translate(lang).TITLE.DURATION}</h3>
						<Input
							labelText='Duration'
							inputType='number'
							placeholderText={translate(lang).PLACEHOLDER.DURATION}
							value={duration}
							onChange={handleChangeDuration}
						/>
						<span>
							{translate(lang).COMMON.DURATION}:{' '}
							<PipeDuration time={duration} />
						</span>
					</div>
				</div>
				<div className='create-course__authors__right'>
					<h3>{translate(lang).TITLE.AUTHORS}</h3>
					<div>
						{authorList.length &&
							authorList
								.filter((a) => !currAuthors.includes(a.id || ''))
								.map((author) => (
									<div key={author.id} className='single-author'>
										<span>{author.name}</span>
										<Button
											buttonText='Add author'
											onClick={handleAddAuthor(author.id || '')}
										/>
									</div>
								))}
					</div>
					<h3>{translate(lang).TITLE.COURSE_AUTHORS}</h3>
					<div>
						{currAuthors.length ? (
							currAuthors.map((author) => {
								const curr = authorList.find((el) => el.id === author);
								return (
									<div key={curr?.id} className='single-author'>
										<span>{curr?.name}</span>
										<Button
											buttonText={translate(lang).BUTTON.DELETE_AUTHOR}
											onClick={handleDeleteAuthor(curr?.id || '')}
										/>
									</div>
								);
							})
						) : (
							<span>{translate(lang).COMMON.AUTHORS_LIST_EMPTY}</span>
						)}
					</div>
				</div>
			</div>
		</form>
	);
};

export default CreateCourse;
