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
