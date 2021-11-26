import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { userReducer } from 'store/user/reducer';
import { authorsReducer } from 'store/authors/reducer';
import { coursesReducer } from 'store/courses/reducer';
import { langReducer } from 'store/lang/reducer';

declare const window: {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	user: userReducer,
	authors: authorsReducer,
	courses: coursesReducer,
	lang: langReducer,
});

export default createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(thunk))
);
