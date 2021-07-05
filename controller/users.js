const bcrypt = require('bcryptjs');

// Load input validation
const validateRegistrationInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load user model
const User = require('../../models/User');

const register = (req, res) => {
	const { error, isValid } = validateRegistrationInput(req.body);

	// check whether request is valid
	if (!isValid) {
		return res.status(400).json(errors);
	}

	// check whether existing user
	User.findOne({ email: req.body.email }).then((user) => {
		// existing user
		if (user) {
			return res.status(400).json({ email: 'Email already exists' });
		}
		// new user
		else {
			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			});
		}

		// hash password before saving to db
		// generate and pass salt to hashing function
		bcrypt.genSalt(10, (err, salt) => {
			// hash password using passed salt
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) {
					throw err;
				}
				newUser.password = hash;
				newUser
					// save to db
					.save()
					.then((user) => res.json(user))
					.catch((err) => console.log(err));
			});
		});
	});
};

module.exports = register;
