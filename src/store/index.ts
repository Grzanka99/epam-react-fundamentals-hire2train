import { configureStore } from '@reduxjs/toolkit';

import authorsReducer from 'store/reducers/authors.reducer';
import coursesReducer from 'store/reducers/courses.reducer';
import userReducer from 'store/reducers/user.reducer';
import langReducer from 'store/reducers/lang.reducer';
import { api } from 'services/api.service';

// declare const window: {
// 	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
// };
//
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		user: userReducer.reducer,
		authors: authorsReducer.reducer,
		courses: coursesReducer.reducer,
		lang: langReducer.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

const userActions = userReducer.actions;
const authorsActions = authorsReducer.actions;
const coursesActions = coursesReducer.actions;
const langActions = langReducer.actions;

export { userActions, authorsActions, coursesActions, langActions };

export default store;
