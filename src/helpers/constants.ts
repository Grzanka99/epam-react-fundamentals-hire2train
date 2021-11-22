export const API = 'http://localhost:3000';

export const ENGLISH = {
	BUTTON: {
		SHOW_COURSE: 'Show course',
		DELETE_COURSE: '',
		EDIT_COURSE: '✎',
		SEARCH: 'Search',
		ADD_NEW: 'Add new course',
		LOGOUT: 'Logout',
		LOGIN: 'Login',
		CREATE_COURSE: 'Create course',
		CREATE_AUTHOR: 'Create author',
		DELETE_AUTHOR: 'Delete author',
		ADD_AUTHOR: 'Add author',
		CANCEL: 'Cancel',
		REGISTRATION: 'Registration',
	},
	TITLE: {
		ADD_AUTHOR: 'Add author',
		DURATION: 'Duration',
		AUTHORS: 'Authors',
		COURSE_AUTHORS: 'Course authors',
		COURSE_INFO_FALLBACK: 'Course not found',
		REGISTRATION: 'Registration',
	},
	PLACEHOLDER: {
		TITLE: 'Enter title',
		DESCRIPTION: 'Enter description',
		AUTHOR: 'Enter author name',
		DURATION: 'Enter duration in minutes',
		SEARCH: 'Enter course name...',
	},
	LINK: {
		BACK_TO_COURSES: 'Back to courses',
		REGISTRATION: 'Registration',
		LOGIN: 'Login',
	},
	COMMON: {
		ID: 'ID',
		DURATION: 'Duration',
		CREATED: 'Created',
		AUTHORS: 'Authors',
		DESCRIPTION: 'Description',
		AUTHORS_LIST_EMPTY: 'Authors list is empty',
		LOGIN: 'Login',
		PASSWORD: 'Password',
		NO_ACCOUNT: 'If you not have and account you can',
		ACCOUNT_EXISTS: 'If you already have and account you can',
	},
	LABEL: {
		EMAIL: 'Email',
		PASSWORD: 'Password',
		USERNAME: 'Name',
	},
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
