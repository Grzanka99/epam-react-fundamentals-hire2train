import { FC, useEffect } from 'react';

import CourseForm from 'components/CourseForm/CourseForm';
import CourseInfo from 'components/CourseInfo/CourseInfo';
import Courses from 'components/Courses/Courses';
import Header from 'components/Header/Header';
import Login from 'components/Login/Login';
import { PrivateRoute } from 'components/PrivateRoute/PrivateRoute';
import Registration from 'components/Registration/Registration';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { languageSet } from 'store/lang/actionCreators';

import './App.scss';
import { getIsAuth, getToken } from 'store/selectors/user.selectors';
import { thunkAuthorsLoad } from 'store/thunks/authors.thunk';
import { thunkCoursesLoad } from 'store/thunks/courses.thunk';
import { authorsActions, coursesActions } from 'store';
import { useUserInfoQuery } from 'services/user-api.service';

const App: FC = () => {
	const isAuth = useSelector(getIsAuth);
	const token = useSelector(getToken);
	const dispatch = useDispatch();

	useUserInfoQuery(token, {
		skip: !isAuth,
	});

	useEffect(() => {
		dispatch(languageSet('en'));
	}, [dispatch]);

	useEffect(() => {
		if (isAuth) {
			authorsActions.cleanAuthors();
			dispatch(thunkAuthorsLoad());

			coursesActions.cleanCourses();
			dispatch(thunkCoursesLoad());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuth]);

	return (
		<>
			<Header />
			<main className='main-view'>
				<Routes>
					{isAuth ? (
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
