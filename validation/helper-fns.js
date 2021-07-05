const validator = require('validator');
const isEmpty = require('is-empty');

const emptyOrExisting = (value) => {
	return isEmpty(value) ? '' : value;
};

const emailChecks = (email, errors) => {
	if (Validator.isEmpty(email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(email)) {
		errors.email = 'Email is invalid';
	}
	return errors;
};

const passwordChecks = (password, errors) => {
	if (Validator.isEmpty(data.password)) {
		errors.password = 'Password field is required';
	}
	return errors;
};

module.exports = {
	emptyOrExisting,
	emailChecks,
	passwordChecks,
};
