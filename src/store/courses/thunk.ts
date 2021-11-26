import { Dispatch } from 'redux';
import {
	coursesServiceCreateCourse,
	coursesServiceRemoveCourse,
	coursesServiceUpdateCourse,
} from 'services/courses.service';
import { ICourse } from 'types/state.interface';
import { coursesAdd, coursesRemove, coursesUpdate } from './actionCreators';

export const thunkCourseRemove = ({ id }: { id: string }) => {
	return async (dispatch: Dispatch) => {
		try {
			const result = await coursesServiceRemoveCourse(id);
			console.log(result);
			dispatch(coursesRemove(id));
		} catch (error) {
			console.error(error);
		}
	};
};

export const thunkCourseCreate =
	({ id, ...newCourse }: ICourse) =>
	async (dispatch: Dispatch) => {
		try {
			const result = await coursesServiceCreateCourse(newCourse);
			dispatch(coursesAdd({ ...result }));
		} catch (error) {
			console.log(error);
		}
	};

export const thunkCourseUpdate =
	(updatedCourse: ICourse) => async (dispatch: Dispatch) => {
		try {
			const result = await coursesServiceUpdateCourse(updatedCourse);
			dispatch(coursesUpdate({ ...result }));
		} catch (error) {
			console.log(error);
		}
	};
