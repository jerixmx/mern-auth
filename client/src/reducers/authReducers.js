import { USER_LOADING, SET_CURRENT_USER } from '../actions/types.js';

const isEmpty = require('is-empty');

const initialState = {
	isAuthenticated: false,
	user: {},
	loading: false,
};

function authReducer(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};
		case USER_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
export default authReducer;
