import { createStore, combineReducers } from 'redux';

import userReducer from './user/reducer';
import authorsReducer from './authors/reducer';

const rootReducer = combineReducers({
	user: userReducer,
	authors: authorsReducer,
});

export default createStore(rootReducer);
