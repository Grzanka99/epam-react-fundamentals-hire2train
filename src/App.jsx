import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
		let localUser = localStorage.getItem('user');
		let localToken = localStorage.getItem('token');

		if (user && !localUser && token && !localToken) {
			localStorage.setItem('user', user);
			localStorage.setItem('token', token);
		}

		if (localUser && localToken) {
			setUser(localUser);
			setToken(localToken);
		}

		localUser = localStorage.getItem('user');
		localToken = localStorage.getItem('token');

		if (!localUser || !localToken) {
			navigate('/login');
		} else if (!!localUser && !!localToken) {
			navigate('/courses');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, token]);

	return (
		<>
			<Header user={user} onLogout={{ setUser, setToken }} />
			<main className='main-view'>
				<Routes>
					<Route exac path='/' element={<Navigate to='/courses' />} />
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
