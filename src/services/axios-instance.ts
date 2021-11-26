import axios, { AxiosInstance } from 'axios';
import { API } from 'helpers/constants';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: API,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use((config: any) => {
	const token = localStorage.getItem('token');

	config.headers.Authorization = token;

	return config;
});

export { axiosInstance };
