const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'must provide name'],
		trim: true,
	},
	email: {
		type: String,
		default: [true, 'must provide email'],
	},
	password: {
		type: String,
		required: [true, 'must set password'],
		minLength: [6, 'must be at least 6 characters'],
		maxLength: [30, 'must be at most 30 characters'],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('users', UserSchema);
