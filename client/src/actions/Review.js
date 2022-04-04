'use strict';

import ENV from './../config.js';
const API_HOST = ENV.api_host;

export function getReviews(stock) {
    const reviews = `${API_HOST}/stocks/${stock}/reviews`;
    fetch(reviews)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                return null;
            }
        })
        .catch(error => {});
}

