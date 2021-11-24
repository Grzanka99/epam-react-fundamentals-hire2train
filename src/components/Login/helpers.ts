import { ILocalStorageKeys } from 'types/common.interface';

export function setLocalStorageOnLogin(data: ILocalStorageKeys): boolean {
	let res: boolean = false;

	try {
		localStorage.setItem('token', data.token);
		localStorage.setItem('user', data.name);
		localStorage.setItem('email', data.email);
		localStorage.setItem('role', data.role);

		res = true;
	} catch (error) {
		console.log(error);
	}

	return res;
}
