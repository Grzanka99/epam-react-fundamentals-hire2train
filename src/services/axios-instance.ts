import axios, { AxiosInstance } from 'axios';
import { API } from 'helpers/constants';

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: API,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export function setAuthToken(token: string): boolean {
	try {
		axiosInstance.defaults.headers.common['Authorization'] = token;
		return true;
	} catch (error) {
		console.log(error);
	} finally {
		return false;
	}
}
