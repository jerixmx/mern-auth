const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Load input validation
const validateRegistrationInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

//Load user model
const User = require('../models/User');

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

const login = (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(400).json({ emailnotfound: 'Email not found' });
		}
	});
	// compare input password from password of found user based on email
	bcrypt.compare(password, user.password).then((isMatch) => {
		if (isMatch) {
			// create JWT payload
			const payload = {
				id: user.id,
				name: user.name,
			};
			jwt.sign(
				payload,
				process.env.secretOrKey,
				{ expiresIn: 31556926 },
				(err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token,
					});
				}
			);
		} else {
			return res.status(400).json({
				passwordincorrect: 'Password incorrect',
			});
		}
	});
};

module.exports = {
	register,
	login,
};
