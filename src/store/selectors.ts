import { IAuthor, ICourse, IState, IUser } from 'types/state.interface';

export const getCourses = (state: IState): ICourse[] => state.courses;
export const getAuthors = (state: IState): IAuthor[] => state.authors;
export const getUser = (state: IState): IUser => state.user;
export const getIsAuth = (state: IState): boolean => Boolean(state.user.isAuth);
export const getLang = (state: IState): string => state.lang;
