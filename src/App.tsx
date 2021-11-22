import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
import { getAuthors, getCourses, getIsAuth } from 'store/selectors';
import { languageSet } from 'store/lang/actionCreators';

const App = () => {
	const authors = useSelector(getAuthors);
	const courses = useSelector(getCourses);

	const isAuth = useSelector(getIsAuth);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(languageSet('en'));
	}, [dispatch]);

	useEffect(() => {
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		const email = localStorage.getItem('email');

		if (user && token && email) {
			dispatch(userLogin({ name: user, token, email }));
		}
	}, [dispatch]);

	const check = localStorage.getItem('user') && localStorage.getItem('token');
	const [isLoggedIn, setIsLoggedIn] = useState(check);

	useEffect(() => {
		setIsLoggedIn(
			localStorage.getItem('user') && localStorage.getItem('token')
		);
	}, [isAuth]);

	return (
		<>
			<Header />
			<main className='main-view'>
				<Routes>
					{isLoggedIn ? (
						<>
							<Route path='/' element={<Navigate to='/courses' />} />
							<Route path='/courses' element={<Courses />} />
							<Route path='/courses/add' element={<CreateCourse />} />
							<Route
								path='/courses/:courseId'
								element={<CourseInfo courses={courses} authors={authors} />}
							/>
							<Route path='*' element={<Navigate to='/courses' />} />
						</>
					) : (
						<>
							<Route path='/registration' element={<Registration />} />
							<Route path='/login' element={<Login />} />
							<Route path='*' element={<Navigate to='/login' />} />
						</>
					)}
				</Routes>
			</main>
		</>
	);
};

export default App;
