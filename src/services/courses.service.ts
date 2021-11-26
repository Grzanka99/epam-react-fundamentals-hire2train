import { ICourse } from 'types/state.interface';

import { axiosInstance } from './axios-instance';

export const coursesServiceRemoveCourse = (id: string): Promise<any> =>
	axiosInstance.delete(`/courses/${id}`).then((response) => response.data);

export const coursesServiceCreateCourse = (data: ICourse): Promise<ICourse> =>
	axiosInstance
		.post('/courses/add', data)
		.then((responde) => responde.data.result);

export const coursesServiceUpdateCourse = ({
	id,
	...data
}: ICourse): Promise<ICourse> =>
	axiosInstance
		.put(`/courses/${id}`, data)
		.then((response) => response.data.result);
