import { Lang } from 'helpers/constants';
import { Role } from 'types/common.enum';
import { IAuthor, ICourse, IState, IUser } from 'types/state.interface';

export const getCourses = (state: IState): ICourse[] => state.courses;
export const getAuthors = (state: IState): IAuthor[] => state.authors;
export const getUser = (state: IState): IUser => state.user;
export const getIsAuth = (state: IState): boolean => Boolean(state.user.isAuth);
export const getLang = (state: IState): Lang => state.lang;
export const getRole = (state: IState): Role => state.user.role || Role.None;
