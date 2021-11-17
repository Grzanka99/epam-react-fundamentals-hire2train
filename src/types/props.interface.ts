import { ICourse } from './state.interface';

export interface ICourseCardProps extends ICourse {}

export interface ISearchBarProps<T> {
	onFind: (found: T[]) => void;
	searchIn: T[];
}
