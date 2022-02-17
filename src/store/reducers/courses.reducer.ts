import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'services/api.service';
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
		builder.addMatcher(api.endpoints.removeCourse.matchFulfilled, removeCourse);
		builder.addMatcher(api.endpoints.updateCourse.matchFulfilled, updateCourse);
		builder.addMatcher(api.endpoints.createCourse.matchFulfilled, addCourse);
		builder.addMatcher(api.endpoints.loadCourses.matchFulfilled, loadCourses);
	},
});

export default coursesReducer;
