import { IAction } from 'types/action.interface';
import { ICourse } from 'types/state.interface';

import { CoursesActionTypes } from './actionTypes';

export function coursesAdd(
	courses: ICourse[] | ICourse
): IAction<CoursesActionTypes.COURSES_ADD, ICourse[]> {
	const payload = Array.isArray(courses) ? courses : [courses];

	return {
		type: CoursesActionTypes.COURSES_ADD,
		payload,
	};
}

export function coursesRemove(
	id: string
): IAction<CoursesActionTypes.COURSES_REMOVE, { id: string }> {
	return {
		type: CoursesActionTypes.COURSES_REMOVE,
		payload: { id },
	};
}

export function coursesUpdate(
	course: ICourse
): IAction<CoursesActionTypes.COURSES_UPDATE, ICourse> {
	return {
		type: CoursesActionTypes.COURSES_UPDATE,
		payload: { ...course },
	};
}

export function coursesClean(): IAction<
	CoursesActionTypes.COURSES_CLEAN,
	null
> {
	return {
		type: CoursesActionTypes.COURSES_CLEAN,
		payload: null,
	};
}
