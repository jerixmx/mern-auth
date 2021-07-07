import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt_decode';

import { GET_ERRORS, USER_LOADING, SET_CURRENT_USER } from './types';

// register user
export const registerUSER = (userData, history) => (dispatch) => {
	axios
		.post('/api/v1/users/register', userData)
		// redirect to login after registration success
		.then((res) => history.push('/login'))
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

// login / get user token
export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/v1/users/login', userData)
		.then((res) => {
			// save token to local storage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			// set token to auth header
			setAuthToken(token);
			//Decode token to get user data
			const decoded = jwt_decode(token);
			//set current user
			dispatch(setCurrenUser(decoded));
		})
		.catch((err) => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

// set logged in user
export const setCurrenUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING,
	};
};

// Log out user
export const logoutUser = () => (dispatch) => {
	// remove token from local storage
	localStorage.removeItem('jwtToken');
	// remove auth header for future requests
	setAuthToken(false);
	// set current user to empty object which will set isAuthenticated to false
	dispatch(setCurrenUser({}));
};
