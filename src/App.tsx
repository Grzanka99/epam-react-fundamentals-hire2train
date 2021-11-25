import { FC, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CourseForm from 'components/CourseForm/CourseForm';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';

import { getIsAuth } from 'store/selectors';
import { languageSet } from 'store/lang/actionCreators';
import {
	thunkLoadAuthors,
	thunkLoadCourses,
	thunkRestoreUserSession,
} from 'store/thunk';

import './App.scss';

const App: FC = () => {
	const isAuth = useSelector(getIsAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(languageSet('en'));
	}, [dispatch]);

	useEffect(() => {
		dispatch(thunkRestoreUserSession());
	}, [dispatch]);

	useEffect(() => {
		if (isAuth) {
			dispatch(thunkLoadAuthors());
			dispatch(thunkLoadCourses());
		}
	}, [dispatch, isAuth]);

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
							<Route
								path='/courses/add'
								element={
									<PrivateRoute>
										<CourseForm />
									</PrivateRoute>
								}
							/>
							<Route
								path='/courses/update/:id'
								element={
									<PrivateRoute>
										<CourseForm />
									</PrivateRoute>
								}
							/>
							<Route path='/courses/:courseId' element={<CourseInfo />} />
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
