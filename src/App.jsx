import { useState } from 'react';
import { mockedAuthorsList, mockedCoursesList } from 'helpers/mockedData';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CreateCourse from 'components/CreateCourse/CreateCourse';

import 'App.scss';

function App() {
	const [addView, setView] = useState(false);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courses, setCourses] = useState(mockedCoursesList);

	const handleChangeView = () => setView(!addView);

	return (
		<>
			<Header />
			<main className='main-view'>
				{addView ? (
					<CreateCourse
						changeView={handleChangeView}
						authors={{ data: authors, set: setAuthors }}
						courses={{ data: courses, set: setCourses }}
					/>
				) : (
					<Courses
						changeView={handleChangeView}
						authors={{ data: authors, set: setAuthors }}
						courses={{ data: courses, set: setCourses }}
					/>
				)}
			</main>
		</>
	);
}

export default App;
