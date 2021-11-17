import { ChangeEvent } from 'react';
import { ICourse } from './state.interface';

export interface ICourseCardProps extends ICourse {}

export interface ISearchBarProps<T> {
	onFind: (found: T[]) => void;
	searchIn: T[];
}

export interface IButtonProps {
	buttonText?: string;
	onClick?: () => void;
	type?: 'submit' | 'reset' | 'button';
	pathTo?: string;
}

export interface IInputProps {
	labelText?: string;
	placeholderText?: string;
	onChange?: (e: ChangeEvent<any>) => void;
	inputType?: string;
	min?: number;
	value?: string | number;
	required?: boolean;
}
