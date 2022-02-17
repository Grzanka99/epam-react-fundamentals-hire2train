import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { coursesEndpoints } from 'services/endpoints/courses.builder';
import { IResponse } from 'types/response.interface';
import { ICourse } from 'types/state.interface';

const initialState: ICourse[] = [];

const addCourse = (
	state: ICourse[],
	action: PayloadAction<IResponse<ICourse | false>>
) => {
	if (!action.payload.result) return state;
	const { result } = action.payload;
	return [...state, { ...result }];
};

const loadCourses = (
	_state: ICourse[],
	action: PayloadAction<IResponse<ICourse[]>>
) => [...action.payload.result];

const removeCourse = (
	state: ICourse[],
	{ payload }: PayloadAction<IResponse<string>>
) => state.filter((course) => course.id !== payload.result);

const updateCourse = (
	state: ICourse[],
	action: PayloadAction<IResponse<ICourse>>
) => {
	if (!action.payload.result) return state;
	const { result } = action.payload;

	return state.map((course) =>
		course.id === result.id ? { ...course, ...result } : course
	);
};

const coursesReducer = createSlice({
	name: 'coursesReducer',
	initialState,
	reducers: {
		removeCourse,
		updateCourse,
		cleanCourses: () => [],
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			coursesEndpoints.endpoints.removeCourse.matchFulfilled,
			removeCourse
		);
		builder.addMatcher(
			coursesEndpoints.endpoints.updateCourse.matchFulfilled,
			updateCourse
		);
		builder.addMatcher(
			coursesEndpoints.endpoints.createCourse.matchFulfilled,
			addCourse
		);
		builder.addMatcher(
			coursesEndpoints.endpoints.loadCourses.matchFulfilled,
			loadCourses
		);
	},
});

export default coursesReducer;
