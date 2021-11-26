import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authorsReducer } from 'store/authors/reducer';
import { coursesReducer } from 'store/courses/reducer';
import { langReducer } from 'store/lang/reducer';
import { userReducer } from 'store/user/reducer';

declare const window: {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
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
