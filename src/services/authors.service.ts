import { IAuthor } from 'types/state.interface';
import { axiosInstance } from './axios-instance';

export async function authorsServiceAddAuthor(data: IAuthor): Promise<boolean> {
	let res: boolean = false;

	try {
		const response = await axiosInstance.post('/authors/add', { ...data });
		if (response.data.successful) res = true;
	} catch (error) {
		console.log(error);
	}

	return res;
}

export async function authorsServiceDeleteAuthor(id: string): Promise<boolean> {
	let res: boolean = false;

	try {
		const response = await axiosInstance.delete(`/authors/${id}`);
		if (response.data.successful) res = true;
	} catch (error) {
		console.log(error);
	}

	return res;
}
