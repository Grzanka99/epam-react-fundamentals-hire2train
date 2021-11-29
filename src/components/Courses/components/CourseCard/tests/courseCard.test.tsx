import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ICourseCardProps } from 'types/props.interface';
import { IAuthor } from 'types/state.interface';
import CourseCard from '../CourseCard';
import { MemoryRouter } from 'react-router-dom';

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
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedProps: ICourseCardProps = {
	title: 'Test Course',
	description: 'Test Description',
	duration: 120,
	creationDate: '10/10/2019',
	id: 'random-id',
	authors: ['a', 'b'],
};

beforeEach(() => {
	render(
		<Provider store={mockedStore as any}>
			<CourseCard {...mockedProps} />
		</Provider>,
		{ wrapper: MemoryRouter }
	);
});

test('should display title', () => {
	expect(screen.queryByText(mockedProps.title)).toBeInTheDocument();
});

test('should display description', () => {
	expect(screen.queryByText(mockedProps.description)).toBeInTheDocument();
});

test('should display duration in correct format', () => {
	expect(screen.queryByText('02:00')).toBeInTheDocument();
});

test('should display authors list', () => {
	expect(screen.getByTestId('authors-list').innerHTML).toContain(
		mockedState.authors[0].name
	);
	expect(screen.getByTestId('authors-list').innerHTML).toContain(
		mockedState.authors[1].name
	);
});

test('should display created date in correct format', () => {
	expect(screen.queryByText('10.10.2019')).toBeInTheDocument();
});
