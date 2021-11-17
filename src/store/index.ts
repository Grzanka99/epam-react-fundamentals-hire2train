import { createStore, combineReducers } from 'redux';

import userReducer from './user/reducer';
import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';

const rootReducer = combineReducers({
	user: userReducer,
	authors: authorsReducer,
	courses: coursesReducer,
});

export default createStore(rootReducer);
