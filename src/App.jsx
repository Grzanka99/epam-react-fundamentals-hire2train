import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { mockedAuthorsList, mockedCoursesList } from 'helpers/mockedData';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CreateCourse from 'components/CreateCourse/CreateCourse';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';

import 'App.scss';

function App() {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courses, setCourses] = useState(mockedCoursesList);

	const [user, setUser] = useState('');
	const [token, setToken] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		if (!user || !token) {
			navigate('/login');
		}
	}, [user, token, navigate]);

	return (
		<>
			<Header user={user} onLogout={{ setUser, setToken }} />
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
					<Route path='/registration' element={<Registration />} />
					<Route
						path='/login'
						element={<Login onLogin={{ setUser, setToken }} />}
					/>
				</Routes>
			</main>
		</>
	);
}

export default App;
