import {
	ChangeEvent,
	FC,
	FormEventHandler,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

import Button from 'common/Button/Button';
import Input from 'common/Input/Input';
import { PipeDuration } from 'components/PipeDuration/PipeDuration';
import { translate } from 'helpers/constants';
import dateGenerator from 'helpers/dateGenerator';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAuthors, getCourses, getLang } from 'store/selectors';
import { IAuthor, ICourse } from 'types/state.interface';

import './CourseForm.scss';
import AuthorsList from './components/AuthorsList';
import {
	useAddAuthorMutation,
	useCreateCourseMutation,
	useRemoveAuthorMutation,
	useUpdateCourseMutation,
} from 'services/api.service';

const CreateCourse: FC = () => {
	const [duration, setDuration] = useState(0);
	const [newAuthorName, setNewAuthorName] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [isUpdate, setIsUpdate] = useState(false);

	const authors = useSelector(getAuthors);
	const courses = useSelector(getCourses);
	const [currAuthors, setCurrAuthors] = useState([] as string[]);

	const lang = useSelector(getLang);

	// useNavigate replaced useHistory in react-router-dom v6
	const navigate = useNavigate();
	const location = useLocation();
	const courseId = useParams().id || '';

	const [addAuthor] = useAddAuthorMutation();
	const [removeAuthor] = useRemoveAuthorMutation();
	const [addCourse] = useCreateCourseMutation();
	const [updateCourse] = useUpdateCourseMutation();

	const handleCreateAuthor = useCallback(
		(newName) => () => {
			if (!newName) {
				alert('Author name cannot be empty');
				return;
			}
			const newAuthor = { name: newName };

			setNewAuthorName('');

			addAuthor(newAuthor);
		},
		[addAuthor]
	);

	const handleRemoveAuthor = useCallback(
		(id: string) => () => {
			if (!id.length) return;
			removeAuthor(id);
		},
		[removeAuthor]
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

	useEffect(() => {
		const localIsUpdate = location.pathname.includes('update');
		setIsUpdate(localIsUpdate);
	}, [location]);

	useEffect(() => {
		if (isUpdate) {
			const localCourse = courses.find((course) => course.id === courseId);
			if (!localCourse) return;

			setTitle(localCourse.title);
			setDescription(localCourse.description);
			setDuration(localCourse.duration);
			setCurrAuthors(localCourse.authors);
		}
	}, [isUpdate, courseId, courses]);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (validateData()) {
			const newCourse: ICourse = {
				title,
				description,
				creationDate: dateGenerator(),
				duration,
				authors: currAuthors,
			};

			if (isUpdate) {
				updateCourse({ id: courseId, ...newCourse } as ICourse);
			} else {
				addCourse(newCourse);
			}

			navigate('/', { replace: true });
		} else return;
	};

	const getFilteredAuthors: IAuthor[] = useMemo(
		() => authors.filter((a) => !currAuthors.includes(a.id || '')) || [],
		[authors, currAuthors]
	);

	const currAuthorsDisplay: IAuthor[] = useMemo(
		() => authors.filter((a) => currAuthors.includes(a.id)) || [],
		[authors, currAuthors]
	);

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
		<form
			className='create-course'
			onSubmit={handleSubmit}
			data-testid='course-form'
		>
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
						buttonText={
							isUpdate
								? translate(lang).BUTTON.UPDATE_COURSE
								: translate(lang).BUTTON.CREATE_COURSE
						}
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
							dataTestId='create-author-button'
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
				<div
					className='create-course__authors__right'
					data-testid='authors-lists'
				>
					<h3>{translate(lang).TITLE.AUTHORS}</h3>
					<div data-testid='authors-all'>
						{!!getFilteredAuthors.length ? (
							<AuthorsList
								authors={getFilteredAuthors}
								onRemove={handleRemoveAuthor}
								onAdd={handleAddAuthor}
								testId='add-author-button'
							/>
						) : (
							<span>{translate(lang).COMMON.AUTHORS_LIST_EMPTY}</span>
						)}
					</div>
					<h3>{translate(lang).TITLE.COURSE_AUTHORS}</h3>
					<div data-testid='authors-course'>
						{currAuthorsDisplay.length ? (
							<AuthorsList
								authors={currAuthorsDisplay}
								onDelete={handleDeleteAuthor}
								testId='delete-author-button'
							/>
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
