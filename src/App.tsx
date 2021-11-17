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
import { IState } from 'types/state.interface';

function App() {
	const navigate = useNavigate();

	const user = useSelector((state: IState) => state.user);
	const authors = useSelector((state: IState) => state.authors);
	const courses = useSelector((state: IState) => state.courses);

	const dispatch = useDispatch();

	useEffect(() => {
		let localUser: string | null = localStorage.getItem('user');
		let localToken: string | null = localStorage.getItem('token');

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
