import { ChangeEvent, Component, ReactElement, ReactNode } from 'react';

import { IAuthor, ICourse } from './state.interface';

export interface ICourseCardProps extends ICourse {}

export interface ISearchBarProps<T> {
	onFind: (found: T[]) => void;
	searchIn: T[];
}

export interface IButtonProps {
	buttonText?: string;
	onClick?: any;
	type?: 'submit' | 'reset' | 'button';
	pathTo?: string;
	children?: ReactNode;
	dataTestId?: string;
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

export interface IPipeDuration {
	hours: string;
	minutes: string;
}

export interface IPrivateRouteProps {
	children: Component | ReactElement;
}

export interface IAuthorsListProps {
	authors: IAuthor[];
	onRemove?: (author: string) => void;
	onAdd?: (author: string) => void;
	onDelete?: (author: string) => void;
	testId?: string;
}
