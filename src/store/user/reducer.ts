import * as actions from './actionTypes';

const initialUserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export default function userReducer(state = initialUserState, action) {
	switch (action.type) {
		case actions.USER_LOGIN:
			return {
				...state,
				isAuth: true,
				name: action.payload.name,
				email: action.payload.email,
				token: action.payload.token,
			};
		case actions.USER_LOGOUT: {
			localStorage.clear();
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		}
		default:
			return state;
	}
}
