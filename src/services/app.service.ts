import { IAuthor, ICourse } from 'types/state.interface';

import { axiosInstance } from './axios-instance';

export const appServiceGetAuthors = (): Promise<IAuthor[]> =>
	axiosInstance.get('/authors/all').then((res) => res.data.result);

export const appServiceGetCourses = (): Promise<ICourse[]> =>
	axiosInstance.get('/courses/all').then((res) => res.data.result);
