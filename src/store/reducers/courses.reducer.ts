import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	thunkCourseCreate,
	thunkCourseRemove,
	thunkCourseUpdate,
	thunkCoursesLoad,
} from 'store/thunks/courses.thunk';
import { ICourse } from 'types/state.interface';

const initialState: ICourse[] = [];

const addCourse = (
	state: ICourse[],
	action: PayloadAction<ICourse | ICourse[] | false>
) => {
	if (!action.payload) return state;
	const { payload } = action;

	const newCourses = Array.isArray(payload) ? payload : [payload];
	return [...state, ...newCourses];
};

const removeCourse = (
	state: ICourse[],
	action: PayloadAction<string | false>
) => {
	if (!action.payload) return state;
	return state.filter((course) => course.id !== action.payload);
};

const updateCourse = (
	state: ICourse[],
	action: PayloadAction<ICourse | false>
) => {
	if (!action.payload) return state;
	const { payload } = action;

	return state.map((course) => {
		if (course.id === payload.id) {
			return { ...course, ...payload };
		}
		return course;
	});
};

const coursesReducer = createSlice({
	name: 'coursesReducer',
	initialState,
	reducers: {
		addCourse,
		removeCourse,
		updateCourse,
		cleanCourses: () => [],
	},
	extraReducers: (builder) => {
		builder.addCase(thunkCourseCreate.fulfilled, addCourse);
		builder.addCase(thunkCourseRemove.fulfilled, removeCourse);
		builder.addCase(thunkCourseUpdate.fulfilled, updateCourse);
		builder.addCase(thunkCoursesLoad.fulfilled, addCourse);
	},
});

export default coursesReducer;
