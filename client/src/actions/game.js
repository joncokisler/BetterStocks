'use strict';

import ENV from './../config.js';
const API_HOST = ENV.api_host;

export function getTopScores(n) {
    const scores = `${API_HOST}/game/highscores/${n}`;
    fetch(scores)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                return null;
            }
        })
        .catch(error => {});
}

export function getHighscore() {
    const score = `${API_HOST}/api/game/highscore/user`;
    fetch(score)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                return null;
            }
        })
        .catch(error => {});
}

export function addScore(score) {
    
    const req = new Request(
        `${API_HOST}/game/score}`,
        {
            method: 'POST',
            body: JSON.stringify({
                score: score
            })
        }
    );
    fetch(req).catch(error => {});
}

export function getAllWords() {
    const words = `${API_HOST}/game/words`;
    fetch(words)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                return null;
            }
        })
        .catch(error => {});
}
