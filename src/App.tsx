import { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CreateCourse from 'components/CreateCourse/CreateCourse';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';

import './App.scss';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from 'store/user/actionCreators';
import 'store/services';
import { getAuthors, getCourses, getUser } from 'store/selectors';

function App() {
	const navigate = useNavigate();

	const user = useSelector(getUser);
	const authors = useSelector(getAuthors);
	const courses = useSelector(getCourses);

	const dispatch = useDispatch();

	useEffect(() => {
		let localUser: string | null = localStorage.getItem('user');
		let localToken: string | null = localStorage.getItem('token');
		let localEmail: string | null = localStorage.getItem('email');

		if (
			user.name &&
			!localUser &&
			user.token &&
			!localToken &&
			user.email &&
			!localEmail
		) {
			localStorage.setItem('user', user.name);
			localStorage.setItem('token', user.token);
			localStorage.setItem('email', user.email);
		}

		if (localUser && localToken && localEmail) {
			dispatch(
				userLogin({
					name: localUser,
					token: localToken,
					email: localEmail,
				})
			);
		}

		localUser = localStorage.getItem('user');
		localToken = localStorage.getItem('token');
		localEmail = localStorage.getItem('email');

		if (!localUser || !localToken) {
			navigate('/login');
		} else if (!!localUser && !!localToken) {
			navigate('/courses');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user.name, user.token, user.email, dispatch]);

	return (
		<>
			<Header />
			<main className='main-view'>
				<Routes>
					<Route path='/' element={<Navigate to='/courses' />} />
					<Route path='/courses' element={<Courses />} />
					<Route path='/courses/add' element={<CreateCourse />} />
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
