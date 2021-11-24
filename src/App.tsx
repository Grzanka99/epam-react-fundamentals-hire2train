import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from 'components/Header/Header';
import Courses from 'components/Courses/Courses';
import CourseForm from 'components/CourseForm/CourseForm';
import Registration from 'components/Registration/Registration';
import Login from 'components/Login/Login';

import './App.scss';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from 'store/user/actionCreators';
import 'store/services';
import { getIsAuth } from 'store/selectors';
import { languageSet } from 'store/lang/actionCreators';
import { Role } from 'types/common.enum';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import { setAuthToken } from 'services/axios-instance';

const App = () => {
	const isAuth = useSelector(getIsAuth);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(languageSet('en'));
	}, [dispatch]);

	useEffect(() => {
		const user = localStorage.getItem('user');
		const token = localStorage.getItem('token');
		const email = localStorage.getItem('email');
		const role: Role = (localStorage.getItem('role') as Role) || Role.None;

		if (user && token && email) {
			setAuthToken(token);
			dispatch(userLogin({ name: user, token, email, role }));
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
							<Route
								path='/courses/add'
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
