import 'jest';
import { CoursesActionTypes } from 'store/courses/actionTypes';

import { coursesReducer } from 'store/courses/reducer';
import { ICourse } from 'types/state.interface';

const newCourse: ICourse = {
	title: 'New Title',
	description: 'New Description',
	creationDate: '12/12/2012',
	duration: 123,
	authors: [],
};

test('sould return initial state', () => {
	expect(coursesReducer(undefined, {})).toEqual([]);
});

test('should handle COURSES_ADD and return new state', () => {
	expect(
		coursesReducer(undefined, {
			type: CoursesActionTypes.COURSES_ADD,
			payload: [newCourse],
		})
	).toEqual([newCourse]);
});

test('should return state', () => {
	const state: ICourse[] = coursesReducer(undefined, {
		type: CoursesActionTypes.COURSES_ADD,
		payload: [newCourse],
	});

	expect(coursesReducer(state, {})).toEqual([newCourse]);
});
