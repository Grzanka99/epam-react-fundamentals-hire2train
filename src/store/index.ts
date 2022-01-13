// import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
// import thunk from 'redux-thunk';
// import { authorsReducer } from 'store/authors/reducer';
// import { coursesReducer } from 'store/courses/reducer';
// import { langReducer } from 'store/lang/reducer';
// import { userReducer } from 'store/user/reducer';
//
//
//
// const rootReducer = combineReducers({
// 	user: userReducer,
// 	authors: authorsReducer,
// 	courses: coursesReducer,
// 	lang: langReducer,
// });
//
// export default createStore(
// 	rootReducer,
// 	composeEnhancer(applyMiddleware(thunk))
// );

import { configureStore } from '@reduxjs/toolkit';

import authorsReducer from 'store/reducers/authors.reducer';
import coursesReducer from 'store/reducers/courses.reducer';
import userReducer from 'store/reducers/user.reducer';
import langReducer from 'store/reducers/lang.reducer';

// declare const window: {
// 	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
// };
//
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
	reducer: {
		user: userReducer.reducer,
		authors: authorsReducer.reducer,
		courses: coursesReducer.reducer,
		lang: langReducer.reducer,
	},
});

const userActions = userReducer.actions;
const authorsActions = authorsReducer.actions;
const coursesActions = coursesReducer.actions;
const langActions = langReducer.actions;

export { userActions, authorsActions, coursesActions, langActions };

export default store;
