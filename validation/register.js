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

function validateRegistrationInput(data) {
	let errors = {};

	// Convert empty fields to an empty string for validator
	dataArray = [data.name, data.email, data.password, data.password2];
	dataArray.forEach(emptyOrExisting);

	errors = emailChecks(data.email, errors);
	errors = passwordChecks(data.password, errors);

	return {
		errors,
		// only valid if there are no errors
		isValid: isEmpty(errors),
	};
}

module.exports = validateRegistrationInput;
