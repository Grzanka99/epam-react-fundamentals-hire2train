import './App.scss';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import { mockedAuthorsList } from './components/Courses/mockedData';
import { useState } from 'react';

function App() {
	const [addView, setView] = useState(false);

	const handleChangeView = () => setView(!addView);

	return (
		<>
			<Header />
			<main className='main-view'>
				{addView ? (
					<CreateCourse authors={mockedAuthorsList} />
				) : (
					<Courses changeView={handleChangeView} />
				)}
			</main>
		</>
	);
}

export default App;
