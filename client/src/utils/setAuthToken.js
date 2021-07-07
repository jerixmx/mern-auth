import axios from 'axios';

const setAuthToken = (token) => {
	// if logged in
	if (token) {
		// Applies authorization token to every request if logged in
		axios.defaults.headers.common['Authorization'] = token;
	}
	// logged out
	else {
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
