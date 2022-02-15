import { Role } from 'types/common.enum';
import { IState, IUser } from 'types/state.interface';

export const getUser = (state: IState): IUser => state.user;

export const getIsAuth = (state: IState): boolean => Boolean(state.user.isAuth);

export const getRole = (state: IState): Role => state.user.role || Role.None;

export const getIsAdmin = (state: IState): boolean =>
	state.user.role?.toLowerCase() === Role.Admin.toLowerCase();

export const getToken = (state: IState): string => state.user.token;
