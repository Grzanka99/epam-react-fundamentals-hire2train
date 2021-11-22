import { createStore, combineReducers } from 'redux';

import { userReducer } from 'store/user/reducer';
import { authorsReducer } from 'store/authors/reducer';
import { coursesReducer } from 'store/courses/reducer';
import { langReducer } from 'store/lang/reducer';

const rootReducer = combineReducers({
	user: userReducer,
	authors: authorsReducer,
	courses: coursesReducer,
	lang: langReducer,
});

export default createStore(rootReducer);
