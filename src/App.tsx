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
import { langActions } from 'store';

import './App.scss';
import { getIsAuth } from 'store/selectors/user.selectors';
import { useLazyUserInfoQuery } from 'services/endpoints/user.builder';
import { useLazyLoadAuthorsQuery } from 'services/endpoints/authors.builder';
import { useLazyLoadCoursesQuery } from 'services/endpoints/courses.builder';

const App: FC = () => {
	const isAuth = useSelector(getIsAuth);
	const dispatch = useDispatch();

	const [triggerUserInfoQuery] = useLazyUserInfoQuery();
	const [triggerAuthorsLoad] = useLazyLoadAuthorsQuery();
	const [triggerCoursesLoad] = useLazyLoadCoursesQuery();

	useEffect(() => {
		dispatch(langActions.setLang('en'));
	}, [dispatch]);

	useEffect(() => {
		if (isAuth) {
			triggerUserInfoQuery();
			triggerAuthorsLoad();
			triggerCoursesLoad();
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
