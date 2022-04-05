'use strict';

import ENV from './../config.js';
const API_HOST = ENV.api_host;


export async function getStockInfo(stock, setStockInfo) {
    const url = `${API_HOST}/api/stocks?stock=${stock}`;
    const res = await fetch(url);
    const resJSON = await res.json();
    if (resJSON.length !== 1) {
        setStockInfo(null);
    } else {
        setStockInfo(resJSON[0]);
    }
}
