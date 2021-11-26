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
		const result = await coursesServiceRemoveCourse(id);
		if (result) {
			dispatch(coursesRemove(id));
		}
	};
};

export const thunkCourseCreate =
	({ id, ...newCourse }: ICourse) =>
	async (dispatch: Dispatch) => {
		try {
			const result = await coursesServiceCreateCourse(newCourse);
			dispatch(coursesAdd({ ...result }));
		} catch (err) {
			console.log(err);
		}
	};

export const thunkCourseUpdate =
	(updatedCourse: ICourse) => async (dispatch: Dispatch) => {
		const result = await coursesServiceUpdateCourse(updatedCourse);

		if (result) {
			dispatch(coursesUpdate({ id: result, ...updatedCourse }));
		}
	};
