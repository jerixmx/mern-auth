const express = require('express');
const router = express.Router();

const { register, login } = require('../../controllers/users');

// @route POST api/users/register
// @desc Register user
// @access Public
router.route('/register').post(register);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.route('/login').post(login);
