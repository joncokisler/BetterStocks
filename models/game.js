'use strict';

const mongoose = require('mongoose');

const Game = mongoose.model('Game', {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    highScore: {
        type: Number,
        required: true
    }
})

module.exports = { Game };
