import { IAuthor, ICourse } from 'types/state.interface';
import { axiosInstance } from './axios-instance';

export async function appServiceGetAuthors(): Promise<IAuthor[] | false> {
	let res: IAuthor[] | false = false;

	try {
		const response = await axiosInstance.get('/authors/all');
		if (response.data.successful) res = response.data.result;
	} catch (error) {
		console.log(error);
	}

	return res;
}

export async function appServiceGetCourses(): Promise<ICourse[] | false> {
	let res: ICourse[] | false = false;

	try {
		const response = await axiosInstance.get('/courses/all');
		if (response.data.successful) res = response.data.result;
	} catch (error) {
		console.log(error);
	}

	return res;
}
