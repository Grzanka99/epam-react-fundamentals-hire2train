import { IAction } from 'types/action.interface';
import { ICourse } from 'types/state.interface';
import { CoursesActionTypes } from './actionTypes';

export function coursesAdd(
	courses: ICourse[] | ICourse
): IAction<CoursesActionTypes, ICourse[]> {
	const payload = Array.isArray(courses) ? courses : [courses];

	return {
		type: CoursesActionTypes.COURSES_ADD,
		payload,
	};
}

export function coursesRemove(
	id: string
): IAction<CoursesActionTypes, { id: string }> {
	return {
		type: CoursesActionTypes.COURSES_REMOVE,
		payload: { id },
	};
}

export function coursesUpdate(
	course: ICourse
): IAction<CoursesActionTypes, ICourse> {
	return {
		type: CoursesActionTypes.COURSES_UPDATE,
		payload: { ...course },
	};
}
