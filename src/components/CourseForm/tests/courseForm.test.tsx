import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Lang, translate } from 'helpers/constants';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { IAuthor, ICourse } from 'types/state.interface';
import CourseForm from '../CourseForm';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
		role: 'admin',
	},
	authors: [
		{ id: 'a', name: 'a1' },
		{ id: 'b', name: 'a2' },
	] as IAuthor[],
	lang: 'en',
	courses: [
		{
			id: 'a1',
			title: 'JavaScript',
			description: 'Lorem Ipsum',
			creationDate: '8/3/2021',
			duration: 160,
			authors: ['a', 'b'],
		},
		{
			id: 'a2',
			title: 'Java',
			description: 'Lorem Ipsum',
			creationDate: '8/3/2019',
			duration: 120,
			authors: ['a', 'b'],
		},
	] as ICourse[],
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

beforeEach(() => {
	const history = createMemoryHistory();
	history.push('courses/add');

	render(
		<Provider store={mockedStore as any}>
			<Router location={history.location} navigator={history}>
				<CourseForm />
			</Router>
		</Provider>
	);
});

test('should show authors list (all and course authors)', () => {
	expect(screen.getByTestId('authors-lists')).toBeInTheDocument();
	expect(screen.getByTestId('authors-all')).toBeInTheDocument();
	expect(screen.getByTestId('authors-course')).toBeInTheDocument();
});

test('"Create author" click button should call dispatch', () => {
	const createAuthorButton = screen.getByTestId('create-author-button');
	const authorNameInput = screen.getByPlaceholderText(
		translate(Lang.EN).PLACEHOLDER.AUTHOR
	);

	fireEvent.input(authorNameInput, { target: { value: 'Test Name' } });

	expect(createAuthorButton).toBeInTheDocument();
	expect(authorNameInput).toBeInTheDocument();

	fireEvent.click(createAuthorButton);
	expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
});

test('"Add author" button click should add an author to course authors list', () => {
	const addAuthorButton = screen.getAllByTestId('add-author-button')[0];
	const authorCourse = screen.getByTestId('authors-course');

	fireEvent.click(addAuthorButton);

	expect(authorCourse).toBeInTheDocument();
	expect(authorCourse.children.length).toBe(1);
	expect(authorCourse.children[0].textContent).toContain('a1');
});

test('"Delete author" button click should delete an author from the course list', () => {
	const addAuthorButton = screen.getAllByTestId('add-author-button')[0];
	const authorCourse = screen.getByTestId('authors-course');
	fireEvent.click(addAuthorButton);

	expect(authorCourse.children[0].textContent).toContain('a1');

	const deleteAuthorButton = screen.getAllByTestId('delete-author-button')[0];
	fireEvent.click(deleteAuthorButton);

	expect(authorCourse.children[0].textContent).not.toContain('a1');
});
