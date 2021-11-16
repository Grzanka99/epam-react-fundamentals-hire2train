import * as actions from './actionTypes';

export function coursesAdd(courses) {
	const payload = Array.isArray(courses) ? courses : [courses];

	return {
		type: actions.COURSES_ADD,
		payload,
	};
}

export function coursesRemove(id) {
	return {
		type: actions.COURSES_REMOVE,
		payload: id,
	};
}
