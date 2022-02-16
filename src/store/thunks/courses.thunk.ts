import { createAsyncThunk } from '@reduxjs/toolkit';
import { appServiceGetCourses } from 'services/app.service';
import {
	coursesServiceCreateCourse,
	coursesServiceRemoveCourse,
	coursesServiceUpdateCourse,
} from 'services/courses.service';
import { ICourse } from 'types/state.interface';

export enum CoursesAsync {
	REMOVE = 'courses/remove',
	CREATE = 'courses/create',
	UPDATE = 'courses/update',
	LOAD = 'courses/load',
}

export const thunkCourseRemove = createAsyncThunk<string | false, string>(
	CoursesAsync.REMOVE,
	async (id: string) => {
		try {
			await coursesServiceRemoveCourse(id);
			return id;
		} catch (error) {
			alert('Something went wrong while removing course');
			return false;
		}
	}
);

export const thunkCourseCreate = createAsyncThunk<ICourse | false, ICourse>(
	CoursesAsync.CREATE,
	async ({ id, ...newCourse }: ICourse) => {
		try {
			const result = await coursesServiceCreateCourse(newCourse);
			return { ...result };
		} catch (error) {
			alert('Something went wrong while creating course');
			return false;
		}
	}
);

export const thunkCourseUpdate = createAsyncThunk<ICourse | false, ICourse>(
	CoursesAsync.UPDATE,
	async (updatedCourse: ICourse) => {
		try {
			const result = await coursesServiceUpdateCourse(updatedCourse);
			return { ...result };
		} catch (error) {
			alert('Something went wrong while updating course');
			return false;
		}
	}
);

export const thunkCoursesLoad = createAsyncThunk<ICourse[] | false, void>(
	CoursesAsync.LOAD,
	async () => {
		try {
			const result = await appServiceGetCourses();
			return result.map((single) => ({ ...single }));
		} catch (error) {
			alert('Something went wrong while loading courses');
			return false;
		}
	}
);
