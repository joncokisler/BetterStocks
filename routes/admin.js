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

/**
 * DELETE /api/stocks/:stock/reviews/:reviewID
 * 
 * Delete a review from this stock page.
 * 
 * Parameters: stock (stock symbol), reviewID (ObjectID of the review to delete)
 * 
 * Body: None
 * 
 * Returns: 200 on success and the stock representation
 */
 router.delete('/api/admin/stocks/:stock/reviews/:reviewId', mongoChecker, adminAuthenticate, async (req, res) => {
    try {
        const stock = await Stock.findOne({symbol: req.params.stock});
        if (!stock) {
            res.status(404).send('Resource not found');
            return;
        }

        const filteredReview = stock.reviews.filter(review => review._id.equals(req.params.reviewId));
        if (filteredReview.length !== 1) {
            res.status(404).send('Resource not found');
            return;
        }
        const reviewToRemove = filteredReview[0];
        if (!reviewToRemove.author.equals(req.session.user)) {
            res.status(403).send('Forbidden');
            return;
        }

        const filtered = stock.reviews.filter(review => !review._id.equals(req.params.reviewId));
        stock.reviews = filtered;
        const result = await stock.save();
        res.send(stock);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
