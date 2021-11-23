import { ILocalStorageKeys } from 'types/common.interface';

export function setLocalStorageOnLogin(data: ILocalStorageKeys): boolean {
	try {
		localStorage.setItem('token', data.token);
		localStorage.setItem('user', data.name);
		localStorage.setItem('email', data.email);
		localStorage.setItem('role', data.role);
		return true;
	} catch (error) {
		return false;
	}
}
