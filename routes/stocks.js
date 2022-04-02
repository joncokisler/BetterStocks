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
        history: [],
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
 * GET /api/stocks?stock=aapl&stock=...
 * 
 * Get list of stock information
 * 
 * Parameters: In the query parameters, use the "stock" key for multiple stocks.
 * 
 * Body: None
 * 
 * Returns: 200 on success and the array of stocks.
 */
router.get('/api/stocks/', mongoChecker, authenticate, async (req, res) => {
    try {
        const stocksToGet = req.query.stock;
        const stock = await Stock.find({symbol: {$in: stocksToGet}});
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

/**
 * PUT /api/stocks/:symbol/price
 * 
 * Update a given stock's price.
 * 
 * Parameters: symbol (stock symbol)
 * 
 * Body: {price: <new stock price>}
 * 
 * Returns: 200 on success and the stock representation in the database
 */
router.put('/api/stocks/:symbol/price', mongoChecker, authenticate, async (req, res) => {
    try {
        const stock = await Stock.findOne({symbol: req.params.symbol});
        if (!stock) {
            res.status(404).send('Resource not found');
            return;
        } else if (!req.body.price) {
            res.status(400).send('Bad request');
            return;
        }
        stock.history.push({timestamp: stock.timestamp, price: stock.price});
        stock.price = req.body.price;
        stock.timestamp = Date.now();
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

/**
 * DELETE /api/stocks/:stock/reviews/:reviewID
 * 
 * Delete a review from this stock page. Must be removing a review posted by the logged in user.
 * 
 * Parameters: stock (stock symbol), reviewID (ObjectID of the review to delete)
 * 
 * Body: None
 * 
 * Returns: 200 on success and the stock representation
 */
router.delete('/api/stocks/:stock/reviews/:reviewId', mongoChecker, authenticate, async (req, res) => {
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
