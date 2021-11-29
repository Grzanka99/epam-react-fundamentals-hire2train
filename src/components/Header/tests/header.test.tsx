import 'jest';
import { render, screen } from '@testing-library/react';

import Header from '../Header';
import { Provider } from 'react-redux';

test('Header', () => {
	const mockedState = {
		user: {
			isAuth: true,
			name: 'Test Name',
		},
		courses: [],
		authors: [],
	};

	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};

	render(
		<Provider store={mockedStore as any}>
			<Header />
		</Provider>
	);

	expect(screen.queryByText(mockedState.user.name)).toBeInTheDocument();
	expect(screen.getByTestId('logo')).toBeInTheDocument();
});
