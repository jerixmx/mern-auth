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
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'must set password'],
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('users', UserSchema);
