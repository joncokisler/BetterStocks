'use strict';

const express = require('express');
const router = express.Router();
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate, adminAuthenticate } = require("./helpers/authentication");

const { User } = require('../models/user');
const { Game } = require('../models/game');


/*************** GAME HIGH SCORE CRUD ***********/

/**
 * POST /api/game/score
 * 
 * Record a new score for the currently logged in user.
 * 
 * Handles adding capital to the user's paper trading information, and overwriting
 *     high scores if necessary.
 * 
 * Parameters: None
 * 
 * Body: {score: <score>}
 * 
 * Returns: 200 on success
 */
router.post('/api/game/score', mongoChecker, authenticate, async (req, res) => {

    try {
        // add to high scores
        let user = await Game.findOne({user: req.session.user});
        if (!user) {
            user = new Game({
                user: req.session.user,
                timestamp: Date.now(),
                highScore: req.body.score
            });
            const result = await user.save();
        } else if (Number(req.body.score) > user.highScore) {
            user.timestamp = Date.now();
            user.highScore = req.body.score;
            const result = await user.save();
        }

        // add to user capital
        user = await User.findById(req.session.user);
        user.paperTrade.capital += Number(req.body.score);
        user.paperTrade.totalMoneyIn += Number(req.body.score);
        const result = await user.save();
        res.send();
    } catch (error) {
        res.send(error)
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            console.log(error);
            res.status(400).send('Bad request');
        }
    }
});

/**
 * GET /api/game/highscores/:n
 * 
 * Retrieve up to n of the highest scores for the game.
 * 
 * Parameters: n (maximum number of records to retrieve)
 * 
 * Body: None
 * 
 * Returns: 200 on success and an array of up to n of the highest scores
 */
router.get('/api/game/highscores/:n', mongoChecker, authenticate, async (req, res) => {
    try {
        const scores = await Game.find().sort({highScore: -1}).limit(req.params.n);
        if (!scores) {
            res.status(404).send('Resource not found');
        } else {
            res.send(scores);
        }
    } catch (error) {
        if (isMongoError(error)) {
            res.status(500).send('Internal server error');
        } else {
            res.status(404).send('Resource not found');
        }
    }
});

/**
 * GET /api/game/highscore/user
 * 
 * Retrieve the highest score for the currently logged in user.
 * 
 * Parameters: None
 * 
 * Body: None
 * 
 * Returns: 200 on success and the user's highest score. 404 if the current user does not have a high score.
 */
router.get('/api/game/highscore/user', mongoChecker, authenticate, async (req, res) => {
    try {
        const highScore = await Game.findOne({user: req.session.user});
        if (!highScore) {
            res.status(404).send('Resource not found');
        } else {
            res.send(highScore);
        }
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});


module.exports = router;
