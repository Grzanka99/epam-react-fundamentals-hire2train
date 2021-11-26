import { IAuthor } from 'types/state.interface';

import { axiosInstance } from './axios-instance';

export const authorsServiceAddAuthor = (data: IAuthor): Promise<IAuthor> =>
	axiosInstance
		.post('/authors/add', { ...data })
		.then((res) => res.data.result);

export const authorsServiceDeleteAuthor = (id: string): Promise<boolean> =>
	axiosInstance.delete(`/authors/${id}`).then((res) => res.data);
