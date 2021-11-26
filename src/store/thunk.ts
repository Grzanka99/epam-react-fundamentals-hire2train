import { Dispatch } from 'redux';
import {
	appServiceGetAuthors,
	appServiceGetCourses,
} from 'services/app.service';
import { authorsAdd, authorsClean } from './authors/actionCreators';
import { coursesAdd, coursesClean } from './courses/actionCreators';

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
