import axios, { AxiosResponse } from 'axios';
import { API } from 'helpers/constants';
import { IAuthor, ICourse, IUser } from 'types/state.interface';
import { authorsAdd } from './authors/actionCreators';
import { coursesAdd } from './courses/actionCreators';
import store from './index';

export async function performLoginRequest(
	email: string,
	password: string
): Promise<false | any> {
	let result;
	try {
		result = await axios.post(`${API}/login`, {
			email,
			password,
		});
	} catch (error: ErrorEvent | any | unknown) {
		result = error.response;
		if (error.response.data.successful === false) {
			alert('Wrong username or password');
		}

		return false;
	}

	return result;
}

export async function getUserInfo(token: string): Promise<IUser> {
	const response = await axios.get(`${API}/users/me`, {
		headers: {
			Authorization: token,
		},
	});

	return response.data.result;
}

async function loadAuthors() {
	let result: AxiosResponse | null = null;

	try {
		result = await axios.get(`${API}/authors/all`);

		if (result && result.status !== 200) {
			throw new Error('Error loading authors');
		}
	} catch (error: ErrorEvent | any | unknown) {
		console.log(error);
		return error.response.status;
	}

	if (result && result.data.successful) {
		const res: IAuthor[] = result.data.result;

		if (!store.getState().authors.length) {
			store.dispatch(authorsAdd(res));
		}
	}
}

async function loadCourses() {
	let result: AxiosResponse | null = null;

	try {
		result = await axios.get(`${API}/courses/all`);
		if (result && result.status !== 200) {
			throw new Error('Error loading courses');
		}
	} catch (error: ErrorEvent | any | unknown) {
		return error?.response.status || 'Unknown error';
	}

	if (result && result.data.successful) {
		const res: ICourse[] = result.data.result;

		if (!store.getState().courses.length) {
			store.dispatch(coursesAdd(res));
		}
	}
}

loadAuthors();
loadCourses();
