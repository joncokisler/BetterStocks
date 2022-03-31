'use strict';

const express = require('express');
const router = express.Router();
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate, adminAuthenticate } = require("./helpers/authentication");

const { User } = require('../models/user');
const { Stock } = require('../models/stock');


/*************** ADMIN FUNCTIONS *********/

/**
 * PATCH /api/admin/users
 * 
 * Update a regular user's information.
 * 
 * Parameters: username (username of the user to change)
 * 
 * Body: Array of operations to complete: {"op", "replace", "path", "/<attribute to replace>", "value": <new value>}
 * 
 *     The only attributes that can be modified are: "displayName", "email", "phone", "betterCoins"
 * 
 * Response: 200 on success and the new user's representation.
 */
router.patch('/api/admin/users/:username', mongoChecker, adminAuthenticate, async (req, res) => {
    try {
        let user = await User.findOne({username: req.params.username});
        if (!user) {
            res.status(404).send('Resource not found');
        } else if (user.admin) {
            res.status(403).send('Forbidden');
        }

        const fieldsToUpdate = {};
        req.body.map(change => {
            const propToChange = change.path.substr(1);
            if (['blacklist', 'displayName', 'email', 'phone'].includes(propToChange)) {
                fieldsToUpdate[propToChange] = change.value;
            } else if ('betterCoins' === propToChange) {
                fieldsToUpdate['paperTrade.capital'] = change.value;
            }
        });

        if (req.body.length !== Object.entries(fieldsToUpdate).length) {
            res.status(400).send('Bad request');
            return;
        }
        user = await User.findOneAndUpdate({_id: user._id}, {$set: fieldsToUpdate}, {returnDocument: 'after'});
        if (!user) {
            res.status(404).send('Resource not found');
        } else {
            res.send(user);
        }
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad request');
        }
    }
});

module.exports = router;
