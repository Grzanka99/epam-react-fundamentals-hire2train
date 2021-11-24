export interface IUserLoginResponse {
	successful: boolean;
	result: string;
	user: {
		email: string;
		name: string | null;
	};
}
