import { Role } from './common.enum';

export interface ILocalStorageKeys {
	token: string;
	name: string;
	email: string;
	role: Role;
}
