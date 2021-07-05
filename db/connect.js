const mongoose = require('mongoose');

const connectDB = (url) => {
	return mongoose.connect(url, {
		// Options for decprecation warnings
		// https://mongoosejs.com/docs/deprecations.html
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
};

module.exports = connectDB;
