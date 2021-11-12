import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { mockedAuthorsList, mockedCoursesList } from 'helpers/mockedData';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CreateCourse from 'components/CreateCourse/CreateCourse';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';

import 'App.scss';
import CourseInfo from 'components/CourseInfo/CourseInfo';

function App() {
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [courses, setCourses] = useState(mockedCoursesList);

	const [user, setUser] = useState('');
	const [token, setToken] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		const localUser = localStorage.getItem('user');
		const localToken = localStorage.getItem('token');

		if (!localUser) localStorage.setItem('user', user);
		if (!localToken) localStorage.setItem('token', token);

		if (!user) setUser(localUser);
		if (!token) setToken(localToken);

		if (!user || !token) {
			navigate('/login');
		} else if (!!user && !!token) {
			navigate('/courses');
		}
	}, [user, token, navigate]);

	return (
		<>
			<Header user={user} onLogout={{ setUser, setToken }} />
			<main className='main-view'>
				<Routes>
					<Route
						exact
						path='/courses'
						element={
							<Courses
								authors={{ data: authors, set: setAuthors }}
								courses={{ data: courses, set: setCourses }}
							/>
						}
					/>
					<Route
						path='/courses/add'
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
					<Route
						path='/courses/:courseId'
						element={<CourseInfo courses={courses} authors={authors} />}
					/>
				</Routes>
			</main>
		</>
	);
}

export default App;
