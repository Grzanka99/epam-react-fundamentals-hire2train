export const BUTTON = {
	SHOW_COURSE: 'Show course',
	DELETE_COURSE: '',
	EDIT_COURSE: '✎',
	SEARCH: 'Search',
	ADD_NEW: 'Add new course',
	LOGOUT: 'Logout',
	CREATE_COURSE: 'Create course',
	CREATE_AUTHOR: 'Create author',
	DELETE_AUTHOR: 'Delete author',
	ADD_AUTHOR: 'Add author',
	CANCEL: 'Cancel',
};

export const TITLE = {
	ADD_AUTHOR: 'Add author',
	DURATION: 'Duration',
	AUTHORS: 'Authors',
	COURSE_AUTHORS: 'Course authors',
	COURSE_INFO_FALLBACK: 'Course not found',
};

export const PLACEHOLDER = {
	TITLE: 'Enter title',
	DESCRIPTION: 'Enter description',
	AUTHOR: 'Enter author name',
	DURATION: 'Enter duration in minutes',
	SEARCH: 'Enter course name...',
};

export const API = 'http://localhost:3000';

export const ENGLISH = {
	BUTTON,
	TITLE,
	PLACEHOLDER,
};

export enum Lang {
	EN = 'en',
	PL = 'pl',
}

export const translate = (lang: Lang): typeof ENGLISH => {
	switch (lang) {
		case Lang.EN:
			return ENGLISH;
		default:
			return ENGLISH;
	}
};
