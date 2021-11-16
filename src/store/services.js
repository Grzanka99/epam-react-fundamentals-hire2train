import axios from 'axios';
import { API } from 'constants.js';
import { authorsAdd } from './authors/actionCreators';
import { coursesAdd } from './courses/actionCreators';
import store from './index';

async function loadAuthors() {
	let result = null;

	try {
		result = await axios.get(`${API}/authors/all`);

		if (result.status !== 200) {
			throw new Error('Error loading authors');
		}
	} catch (error) {
		console.log(error);
		return error.response.status;
	}

	if (result.data.successful) {
		const res = result.data.result;

		if (!store.getState().authors.length) {
			store.dispatch(authorsAdd(res));
		}
	}
}

async function loadCourses() {
	let result = null;

	try {
		result = await axios.get(`${API}/courses/all`);
		if (result.status !== 200) {
			throw new Error('Error loading courses');
		}
	} catch (error) {
		console.log(error);
		return error.response.status;
	}

	if (result.data.successful) {
		const res = result.data.result;

		if (!store.getState().courses.length) {
			store.dispatch(coursesAdd(res));
		}
	}
}

loadAuthors();
loadCourses();
