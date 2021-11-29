import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Router, Routes } from 'react-router-dom';
import { IAuthor, ICourse } from 'types/state.interface';
import Courses from 'components/Courses/Courses';
import CourseForm from 'components/CourseForm/CourseForm';
import { createMemoryHistory } from 'history';

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

test('should display amount of CourseCard equal length of courses array', () => {
	render(
		<Provider store={mockedStore as any}>
			<Courses />
		</Provider>,
		{ wrapper: MemoryRouter }
	);
	const coursesList = screen.getByTestId('courses');
	expect(coursesList.children.length).toBe(mockedState.courses.length);
});

test('should display empty container if courses array length is 0', () => {
	const emptyState = {
		...mockedState,
		courses: [],
	};
	const emptyStore = {
		getState: () => emptyState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	render(
		<Provider store={emptyStore as any}>
			<Courses />
		</Provider>,
		{ wrapper: MemoryRouter }
	);
	const coursesList = screen.getByTestId('courses-list');
	expect(coursesList.children.length).toBe(0);
});

test('CourseForm should be showed after a click on button "Add new course"', () => {
	const history = createMemoryHistory();
	history.push('/courses');

	const { rerender } = render(
		<Provider store={mockedStore as any}>
			<Router location={history.location} navigator={history}>
				<Routes>
					<>
						<Route path='/courses' element={<Courses />} />
						<Route path='/courses/add' element={<CourseForm />} />
					</>
				</Routes>
			</Router>
		</Provider>
	);

	const button = screen.getByTestId('add-course-button');
	fireEvent(
		button,
		new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
		})
	);

	rerender(
		<Provider store={mockedStore as any}>
			<Router location={history.location} navigator={history}>
				<Routes>
					<>
						<Route path='/courses' element={<Courses />} />
						<Route path='/courses/add' element={<CourseForm />} />
					</>
				</Routes>
			</Router>
		</Provider>
	);

	expect(screen.getByTestId('course-form')).toBeInTheDocument();
});
