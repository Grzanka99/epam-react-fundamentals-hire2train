import axios from 'axios';
import { API } from 'helpers/constants';
import { IUser } from 'types/state.interface';

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

export async function performLogoutRequest(token: string): Promise<void> {
	await axios.delete(`${API}/logout`, {
		headers: {
			Authorization: token,
		},
	});
}
