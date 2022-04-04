'use strict';

import ENV from '../config.js';
const API_HOST = ENV.api_host;

export async function getReviews(stock, reviews, setReviews) {
    try {
        const reviewUrl = `${API_HOST}/api/stocks/${stock}/reviews`;
        const res = await fetch(reviewUrl);
        if (res.status !== 200) {
            return;
        }
        const resJSON = await res.json();

        for (const review of resJSON) {
            const userUrl = `${API_HOST}/api/users/${review.author}`;
            const res2 = await fetch(userUrl);
            if (res.status !== 200) {
                return;
            }
            const res2JSON = await res2.json();
            review.displayName = res2JSON.displayName;
        }

        setReviews(resJSON.reverse());
    } catch (error) {
        console.log(error);
    }
    
}

