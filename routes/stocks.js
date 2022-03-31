'use strict';

const express = require('express');
const router = express.Router();
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate, adminAuthenticate } = require("./helpers/authentication");

const { Stock } = require('../models/stock');

/***************** STOCK CRUD **************************/

/**
 * POST /api/stocks
 * 
 * Parameters: None
 * 
 * Body: {symbol: <stock symbol>, price: <current stock price>}
 * 
 * Returns: 200 on success and the representation of the stock
 */
router.post('/api/stocks', mongoChecker, adminAuthenticate, async (req, res) => {
    const stock = new Stock({
        symbol: req.body.symbol,
        timestamp: Date.now(),
        price: req.body.price,
        reviews: []
    });
    try {
        const result = await stock.save();
        res.send(stock);
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad request');
        }
    }

});

/**
 * GET /api/stocks/:symbol
 * 
 * Get current stock information.
 * 
 * Parameters: symbol (stock symbol)
 * 
 * Body: None
 * 
 * Returns: 200 on success and the stock representation in the database
 */
router.get('/api/stocks/:symbol', mongoChecker, authenticate, async (req, res) => {
    try {
        const stock = await Stock.findOne({symbol: req.params.symbol});
        if (!stock) {

            // gather stock info from Yahoo Finance and store

            res.status(404).send('Resource not found');
        } else {
            // check timestamp and update if necessary

            res.send(stock);
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});


/************* STOCK REVIEW CRUD ****************/

/**
 * POST /api/stocks/:stock/reviews
 * 
 * Create a new review for the given stock.
 * 
 * Parameters: stock (stock symbol to add a review to)
 * 
 * Body: {review: <review string>, stars: <number of stars>}
 * 
 * Returns: 200 on success and the updated array of reviews.
 */
router.post('/api/stocks/:stock/reviews', mongoChecker, authenticate, async (req, res) => {
    try {
        const stock = await Stock.findOne({symbol: req.params.stock});
        if (!stock) {
            res.status(404).send('Resource not found');
            return;
        }
        const review = stock.reviews.create({
            author: req.session.user,
            timestamp: Date.now(),
            review: req.body.review,
            stars: req.body.stars
        });
        stock.reviews.push(review);

        const result = await stock.save();
        res.send(stock.reviews);
    } catch (error) {
        console.log(error);
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(400).send('Bad request');
        }
    }
});

/**
 * GET /api/stocks/:stock/reviews
 * 
 * Get review information for a given stock.
 * 
 * Parameters: stock (stock symbol)
 * 
 * Body: None
 * 
 * Returns: 200 on success and the reviews for the given stock
 */
router.get('/api/stocks/:stock/reviews', mongoChecker, authenticate, async (req, res) => {
    try {
        const stock = await Stock.findOne({symbol: req.params.stock});
        if (!stock) {
            res.status(404).send('Resource not found');
        } else {
            res.send(stock.reviews);
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;