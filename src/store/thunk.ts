import { Dispatch } from 'redux';
import {
	appServiceGetAuthors,
	appServiceGetCourses,
} from 'services/app.service';

import { authorsAdd, authorsClean } from './authors/actionCreators';
import { coursesAdd, coursesClean } from './courses/actionCreators';

export const thunkLoadAuthors = () => async (dispatch: Dispatch) => {
	try {
		const res = await appServiceGetAuthors();
		dispatch(authorsClean());

		dispatch(authorsAdd(res));
	} catch (error) {
		console.log(error);
		alert('Something went wrong while loading authors!');
	}
};

export const thunkLoadCourses = () => async (dispatch: Dispatch) => {
	try {
		const res = await appServiceGetCourses();
		dispatch(coursesClean());

		dispatch(coursesAdd(res));
	} catch (error) {
		console.log(error);
		alert('Something went wrong while loading courses!');
	}
};
