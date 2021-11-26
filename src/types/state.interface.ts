import { DefaultRootState } from 'react-redux';

import { Lang } from 'helpers/constants';

import { Role } from './common.enum';

export interface IUser {
	isAuth?: boolean;
	name: string;
	email: string;
	token: string;
	role?: Role;
}

export interface ICourse {
	id?: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
}

export interface IAuthor {
	id?: string;
	name: string;
}

export interface IState extends DefaultRootState {
	user: IUser;
	courses: ICourse[];
	authors: IAuthor[];
	lang: Lang;
}
