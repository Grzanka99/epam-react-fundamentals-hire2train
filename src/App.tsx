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
import { thunkGetCurrentUser } from 'store/thunks/user.thunk';
import { getIsAuth } from 'store/selectors/user.selectors';
import { thunkAuthorsLoad } from 'store/thunks/authors.thunk';
import { thunkCoursesLoad } from 'store/thunks/courses.thunk';
import { authorsActions, coursesActions } from 'store';

const App: FC = () => {
	const isAuth = useSelector(getIsAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(languageSet('en'));
	}, [dispatch]);

	useEffect(() => {
		if (isAuth) {
			dispatch(thunkGetCurrentUser());

			authorsActions.cleanAuthors();
			dispatch(thunkAuthorsLoad());

			coursesActions.cleanCourses();
			dispatch(thunkCoursesLoad());
		}
	}, [dispatch, isAuth]);

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
