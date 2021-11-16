import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { mockedCoursesList } from 'helpers/mockedData';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CreateCourse from 'components/CreateCourse/CreateCourse';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';

import 'App.scss';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from 'store/user/actionCreators';
import 'store/services';

function App() {
	const [courses, setCourses] = useState(mockedCoursesList);

	const navigate = useNavigate();

	const user = useSelector((state) => state.user);
	const authors = useSelector((state) => state.authors);

	const dispatch = useDispatch();

	useEffect(() => {
		let localUser = localStorage.getItem('user');
		let localToken = localStorage.getItem('token');

		if (user.name && !localUser && user.token && !localToken) {
			localStorage.setItem('user', user.name);
			localStorage.setItem('token', user.token);
		}

		if (localUser && localToken) {
			dispatch(
				userLogin({
					name: localUser,
					token: localToken,
				})
			);
		}

		localUser = localStorage.getItem('user');
		localToken = localStorage.getItem('token');

		if (!localUser || !localToken) {
			navigate('/login');
		} else if (!!localUser && !!localToken) {
			navigate('/courses');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user.name, user.token, user.email, dispatch]);

	return (
		<>
			<Header user={user} />
			<main className='main-view'>
				<Routes>
					<Route exac path='/' element={<Navigate to='/courses' />} />
					<Route
						exact
						path='/courses'
						element={<Courses courses={{ data: courses, set: setCourses }} />}
					/>
					<Route
						path='/courses/add'
						element={
							<CreateCourse courses={{ data: courses, set: setCourses }} />
						}
					/>
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
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
