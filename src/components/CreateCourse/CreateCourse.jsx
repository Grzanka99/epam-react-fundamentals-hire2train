import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Button from 'common/Button/Button';
import Input from 'common/Input/Input';

import pipeDuration from '../../helpers/pipeDuration';
import dateGenerator from '../../helpers/dateGenerator';

import { BUTTON, PLACEHOLDER, TITLE } from '../../constants';

import './CreateCourse.scss';

const CreateCourse = ({ authors, courses }) => {
	const [duration, setDuration] = useState(0);
	const [currAuthors, setCurrAuthors] = useState([]);
	const [authorList, setAuthorsList] = useState(authors.data);
	const [newAuthorName, setNewAuthorName] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

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
		},
		[authorList]
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

	const handleSubmit = (e) => {
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

			courses.set([...courses.data, newCourse]);
			authors.set(authorList);
			navigate('/', { replace: true });
		} else return;
	};

	const handleAuthorNameChange = (e) => setNewAuthorName(e.target.value);
	const handleChangeDuration = (e) =>
		setDuration(Number(e.target.value) < 1 ? 1 : e.target.value);

	const handleAddAuthor = (id) => () => setCurrAuthors([...currAuthors, id]);
	const handleDeleteAuthor = (id) => () =>
		setCurrAuthors(currAuthors.filter((el) => el !== id));

	const handleChangeTitle = (e) => setTitle(e.target.value);
	const handleChangeDescription = (e) => setDescription(e.target.value);

	return (
		<form className='create-course' onSubmit={handleSubmit}>
			<div className='create-course__title'>
				<Input
					labelText='Title'
					value={title}
					onChange={handleChangeTitle}
					placeholderText={PLACEHOLDER.TITLE}
				/>
				<Button buttonText={BUTTON.CREATE_COURSE} type='submit' />
			</div>
			<label className='create-course__desc'>
				Description
				<textarea
					name='description'
					id='description-input'
					cols='30'
					rows='10'
					placeholder={PLACEHOLDER.DESCRIPTION}
					value={description}
					onChange={handleChangeDescription}
				/>
			</label>
			<div className='create-course__authors'>
				<div className='create-course__authors__left'>
					<div className='create-course__authors__left__new-author'>
						<h3>{TITLE.ADD_AUTHOR}</h3>
						<Input
							labelText='Author name'
							value={newAuthorName}
							onChange={handleAuthorNameChange}
							placeholderText={PLACEHOLDER.AUTHOR}
						/>
						<Button
							buttonText={BUTTON.CREATE_AUTHOR}
							onClick={handleCreateAuthor(newAuthorName)}
						/>
					</div>
					<div className='create-course__authors__left__duration'>
						<h3>{TITLE.DURATION}</h3>
						<Input
							labelText='Duration'
							inputType='number'
							placeholderText={PLACEHOLDER.DURATION}
							value={duration}
							onChange={handleChangeDuration}
						/>
						<span>Duration: {pipeDuration(duration)}</span>
					</div>
				</div>
				<div className='create-course__authors__right'>
					<h3>{TITLE.AUTHORS}</h3>
					<div>
						{authorList.length &&
							authorList
								.filter((a) => !currAuthors.includes(a.id))
								.map((author) => (
									<div key={author.id} className='single-author'>
										<span>{author.name}</span>
										<Button
											buttonText='Add author'
											onClick={handleAddAuthor(author.id)}
										/>
									</div>
								))}
					</div>
					<h3>{TITLE.COURSE_AUTHORS}</h3>
					<div>
						{currAuthors.length ? (
							currAuthors.map((author) => {
								const curr = authorList.find((el) => el.id === author);
								return (
									<div key={curr.id} className='single-author'>
										<span>{curr.name}</span>
										<Button
											buttonText={BUTTON.DELETE_AUTHOR}
											onClick={handleDeleteAuthor(curr.id)}
										/>
									</div>
								);
							})
						) : (
							<span>Authors list is epmpty</span>
						)}
					</div>
				</div>
			</div>
		</form>
	);
};

export default CreateCourse;
