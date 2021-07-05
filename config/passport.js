const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
require('dotenv').config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

const verify = (jw_payload, done) => {
	User.findById(jwt_payload.id)
		.then((user) => {
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		})
		.catch((err) => console.log(err));
};

const usePassport = (passport) => {
	passport.use(new JwtStrategy(opts, verify(jw_payload, done)));
};

module.exports = usePassport;
