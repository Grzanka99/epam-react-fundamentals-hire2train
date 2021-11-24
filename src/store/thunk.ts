import { Dispatch } from 'redux';
import {
	appServiceGetAuthors,
	appServiceGetCourses,
} from 'services/app.service';
import { setAuthToken } from 'services/axios-instance';
import { Role } from 'types/common.enum';
import { authorsAdd, authorsClean } from './authors/actionCreators';
import { coursesAdd, coursesClean } from './courses/actionCreators';
import { userLogin } from './user/actionCreators';

export const thunkLoadAuthors = () => async (dispatch: Dispatch) => {
	const res = await appServiceGetAuthors();

	if (res) {
		dispatch(authorsClean());

		res.forEach((author) => {
			dispatch(authorsAdd(author));
		});
	} else {
		alert('Something went wrong while loading authors!');
	}
};

export const thunkLoadCourses = () => async (dispatch: Dispatch) => {
	const res = await appServiceGetCourses();

	if (res) {
		dispatch(coursesClean());
		res.forEach((course) => {
			dispatch(coursesAdd(course));
		});
	} else {
		alert('Something went wrong while loading courses!');
	}
};

export const thunkRestoreUserSession = () => (dispatch: Dispatch) => {
	const user = localStorage.getItem('user');
	const token = localStorage.getItem('token');
	const email = localStorage.getItem('email');
	const role: Role = (localStorage.getItem('role') as Role) || Role.None;

	if (user && token && email) {
		setAuthToken(token);
		dispatch(userLogin({ name: user, token, email, role }));
	}
};
