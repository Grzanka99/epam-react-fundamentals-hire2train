import { Dispatch } from 'redux';
import {
	coursesServiceCreateCourse,
	coursesServiceRemoveCourse,
} from 'services/courses.service';
import { ICourse } from 'types/state.interface';
import { coursesAdd, coursesRemove } from './actionCreators';

export const thunkCourseRemove = ({ id }: { id: string }) => {
	return async (dispatch: Dispatch) => {
		const result = await coursesServiceRemoveCourse(id);
		if (result) {
			dispatch(coursesRemove(id));
		}
	};
};

export const thunkCourseCreate =
	({ id, ...newCourse }: ICourse) =>
	async (dispatch: Dispatch) => {
		const result = await coursesServiceCreateCourse(newCourse);
		if (result) {
			dispatch(coursesAdd({ id: result, ...newCourse }));
		}
	};
