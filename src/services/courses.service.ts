import { ICourse } from 'types/state.interface';
import { axiosInstance } from './axios-instance';

export async function coursesServiceRemoveCourse(id: string): Promise<boolean> {
	let res: boolean = false;

	try {
		const response = await axiosInstance.delete(`/courses/${id}`);

		if (response.data.successful) res = true;
	} catch (error) {
		console.log(error);
	}

	return res;
}

export async function coursesServiceCreateCourse(
	data: ICourse
): Promise<string | false> {
	let res: string | false = false;

	try {
		const response = await axiosInstance.post('/courses/add', data);
		if (response.data.successful) res = response.data.result.id;
	} catch (error) {
		console.log(error);
	}

	return res;
}

export async function coursesServiceUpdateCourse({
	id,
	...data
}: ICourse): Promise<string | false> {
	let res: string | false = false;
	if (!id) return res;

	try {
		const response = await axiosInstance.put(`/courses/${id}`, data);
		if (response.data.successful) res = response.data.result.id;
	} catch (error) {
		console.log(error);
	}

	return res;
}
