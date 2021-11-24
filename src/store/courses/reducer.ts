import { IAction } from 'types/action.interface';
import { ICourse } from 'types/state.interface';
import { CoursesActionTypes } from './actionTypes';

const initialCoursesState: ICourse[] = [];

export function coursesReducer(
	state = initialCoursesState,
	action: IAction<CoursesActionTypes, any>
): ICourse[] {
	switch (action.type) {
		case CoursesActionTypes.COURSES_ADD:
			return [...state, ...action.payload];
		case CoursesActionTypes.COURSES_REMOVE:
			return state.filter((course) => course.id !== action.payload.id);
		case CoursesActionTypes.COURSES_UPDATE:
			return state.map((course) => {
				if (course.id === action.payload.id) {
					return { ...course, ...action.payload };
				}
				return course;
			});
		case CoursesActionTypes.COURSES_CLEAN:
			return [];
		default:
			return state;
	}
}
