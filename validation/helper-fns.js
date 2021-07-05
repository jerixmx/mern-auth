const validator = require('validator');
const isEmpty = require('is-empty');
const validateLoginInput = require('./login');

// replace empty field with blank string for validator use
//
const emptyOrExisting = (value) => {
	return isEmpty(value) ? '' : value;
};

const nameChecks = (name, errors) => {
	if (validator.isEmpty(name)) {
		errors.name = 'Name field is required';
	}
	return errors;
};

const emailChecks = (email, errors) => {
	if (validator.isEmpty(email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(email)) {
		errors.email = 'Email is invalid';
	}
	return errors;
};

const passwordChecks = (password, oneOrTwo, errors) => {
	if (validator.isEmpty(password)) {
		if (oneOrTwo === 1) {
			errors.password = 'Password field is required';
		} else {
			errors.password2 = 'Confirm password field is required';
		}
	}
	return errors;
};

const passwordCreationChecks = (password, password2, errors) => {
	errors = passwordChecks(password, 1, errors);
	errors = passwordChecks(password2, 2, errors);
	if (!Validator.isLength(password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at least 6 characters';
	}
	if (!validator.equals(password, password2)) {
		errors.password2 = 'Passwords must match';
	}
	return errors;
};

module.exports = {
	emptyOrExisting,
	nameChecks,
	emailChecks,
	passwordChecks,
	passwordCreationChecks,
};
