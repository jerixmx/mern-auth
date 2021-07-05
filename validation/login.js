const isEmpty = require('is-empty');
const {
	emptyOrExisting,
	emailChecks,
	passwordChecks,
} = require('./helper-fns');

function validateLoginInput(data) {
	let errors = {};

	// Convert empty fields to an empty string for validator
	dataArray = [data.email, data.password];
	dataArray.forEach(emptyOrExisting);

	errors = emailChecks(data.email, errors);
	errors = passwordChecks(data.password, errors);

	return {
		errors,
		// only valid if there are no errors
		isValid: isEmpty(errors),
	};
}

module.exports = validateLoginInput;
