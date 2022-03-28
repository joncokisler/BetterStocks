'use strict';

const express = require('express');
const router = express.Router();
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

const { User } = require('../models/user');
const { Stock } = require('../models/stock');

const env = process.env.NODE_ENV;
const USE_TEST_USER = env !== 'production' && process.env.TEST_USER_ON; // option to turn on the test user.
const TEST_USER_ID = '623e007952cdf8af877cef4c' // the id of our test user (you will have to replace it with a test user that you made). can also put this into a separate configutation file

/***************** STOCK CRUD **************************/



module.exports = router;
