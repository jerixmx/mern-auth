const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
// set users router
const users = require('./routes/api/users');

// Middleware: request parsing
app.use(
	express.urlencoded({
		// query string library only
		extended: false,
	})
);
app.use(express.json());

// db connection
const connectDB = require('./db/connect');
require('dotenv').config();

// Middleware: passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Route base path (/api/users) to users router
app.use('/api/v1/users', users);

// port listener
const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Server up and running on port ${port}!`));
	} catch (error) {
		console.log(error);
	}
};

start();
