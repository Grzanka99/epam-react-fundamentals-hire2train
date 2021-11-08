import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { mockedAuthorsList, mockedCoursesList } from 'helpers/mockedData';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CreateCourse from 'components/CreateCourse/CreateCourse';

import 'App.scss';

function App() {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courses, setCourses] = useState(mockedCoursesList);

	return (
		<>
			<Header />
			<Router>
				<main className='main-view'>
					<Routes>
						<Route
							exact
							path='/'
							element={
								<Courses
									authors={{ data: authors, set: setAuthors }}
									courses={{ data: courses, set: setCourses }}
								/>
							}
						/>
						<Route
							path='/new-course'
							element={
								<CreateCourse
									authors={{ data: authors, set: setAuthors }}
									courses={{ data: courses, set: setCourses }}
								/>
							}
						/>
					</Routes>
				</main>
			</Router>
		</>
	);
}

export default App;
