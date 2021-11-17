import * as actions from './actionTypes';

const initialCoursesState = [];

export default function coursesReducer(state = initialCoursesState, action) {
	switch (action.type) {
		case actions.COURSES_ADD: {
			return [...state, ...action.payload];
		}
		case actions.COURSES_REMOVE:
			return state.filter((course) => course.id !== action.payload.id);
		case actions.COURSES_UPDATE: {
			return state.map((course) => {
				if (course.id === action.payload.id) {
					return { ...course, ...action.payload };
				}
				return course;
			});
		}
		default:
			return state;
	}
}
