import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICourse } from 'types/state.interface';

const initialState: ICourse[] = [];

const coursesReducer = createSlice({
	name: 'coursesReducer',
	initialState,
	reducers: {
		addCourse: (state, action: PayloadAction<ICourse[] | ICourse>) => {
			const payload: ICourse[] | ICourse = action.payload;
			const newCourses: ICourse[] = Array.isArray(payload)
				? payload
				: [payload];

			return [...state, ...newCourses];
		},
		removeCourse: (state, action: PayloadAction<string>) =>
			state.filter((course) => course.id !== action.payload),
		updateCourse: (state, action: PayloadAction<ICourse>) =>
			state.map((course) => {
				if (course.id === action.payload.id) {
					return { ...course, ...action.payload };
				}

				return course;
			}),
		cleanCourses: () => [],
	},
});

export default coursesReducer;
