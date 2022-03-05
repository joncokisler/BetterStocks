import React, { useState } from 'react';

import Navbar from '../navbar/Navbar';
import StockList from '../StockList';

import './styles.css';

const ALL_STOCKS = [  // price temporarily a list to simulate price changes
    {symbol: 'AAPL', price: [73, 23, 38, 45]},
    {symbol: 'AMD', price: [85, 92, 66, 12]},
    {symbol: 'INTC', price: [54, 57, 29, 36]},
    {symbol: 'NVDA', price: [11, 33, 47, 37]},
    {symbol: 'TSLA', price: [73, 78, 82, 22]},
  ]

function PaperTrade() {
    const INITIAL_BALANCE = 1000;

    const [balance, setBalance] = useState(INITIAL_BALANCE);  // money available to trade with
    const [value, setValue] = useState(0);  // value of stock holdings
    const performance_percent = ((value + balance - INITIAL_BALANCE) / INITIAL_BALANCE) * 100

    const [stockSymbol, setStockSymbol] = useState('');

    /* Stock holdings formatted as:
        {SYMBOL: {
            currPrice: PRICE,
            numHoldings: HOLDINGS
        }}
    */
    const [stockHoldings, setStockHoldings] = useState({});

    /* Handle a buy/sell event */
    function stockBuySell(e) {
        e.preventDefault();
        switch ( e.nativeEvent.submitter.name ) {
            case 'buy':
                if (ALL_STOCKS.map((s) => s.symbol).includes(stockSymbol)) {
                    const stockPrices = ALL_STOCKS.filter((s) => s.symbol === stockSymbol)[0].price;
                    const randPrice = stockPrices[Math.floor(Math.random() * stockPrices.length)];
                    if (stockSymbol in stockHoldings) {
                        stockHoldings[stockSymbol].numHoldings++;
                    } else {
                        stockHoldings[stockSymbol] = {
                            numHoldings: 1
                        }
                    }
                    stockHoldings[stockSymbol].currPrice = randPrice;
                    setBalance(balance - randPrice);
                    setStockHoldings(stockHoldings);
                }
                break;

            case 'sell':
                if (Object.keys(stockHoldings).includes(stockSymbol)) {
                    const stockPrices = ALL_STOCKS.filter((s) => s.symbol === stockSymbol)[0].price;
                    const randPrice = stockPrices[Math.floor(Math.random() * stockPrices.length)];
                    if (stockSymbol in stockHoldings) {
                        stockHoldings[stockSymbol].numHoldings--;
                    } else {
                        stockHoldings[stockSymbol] = {
                            numHoldings: 1
                        }
                    }
                    stockHoldings[stockSymbol].currPrice = randPrice;
                    setBalance(balance + randPrice);
                    setStockHoldings(stockHoldings);
                }
                break;

            default:
                console.log('NO MATCH');  // should never hit this
        }

        /* Update stock price. TODO move to updating on interval? */
        setValue(Object.entries(stockHoldings).reduce((v, keyValue) => {
            const [s, info] = keyValue;
            return v + (info.currPrice * info.numHoldings);
        }, 0));
    }

    /* Convert from the stock holdings object format to the required list format */
    function convertHoldingsToListing() {
        return Object.entries(stockHoldings).reduce((holdings, keyValue) => {
            const [s, info] = keyValue;
            holdings.push({
                symbol: s,
                trend: [],  // TODO add price trace
                val1: info.currPrice,
                val2: info.numHoldings
            })
            return holdings;
        }, [])
    }

    return (
        <div className='paperTrade'>
            {/* <Navbar /> */}
            <div className='content'>
                <h3>Paper Trade</h3>
                
                {/* Portfolio Statistics */}
                <table className='statistics'>
                    <thead>
                        <tr>
                            <th>Current Balance</th>
                            <th>Portfolio Value</th>
                            <th>All Time Performance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{ `$${balance.toFixed(2)}` }</td>
                            <td>{ `$${(balance + value).toFixed(2)}` }</td>
                            <td>{ `${performance_percent.toFixed(2)}%` }</td>
                        </tr>
                    </tbody>
                </table>

                {/* Buy/Sell buttons */}
                <form className='buySell' onSubmit={ stockBuySell } >
                    <label>
                        Stock:
                        <input type='text' value={ stockSymbol } onChange={(e) => setStockSymbol(e.target.value.toUpperCase())} placeholder='Symbol' />
                    </label>
                    <input type='submit' name='buy' value='Buy' />
                    <input type='submit' name='sell' value='Sell' />
                </form>

                <div className='holdings'>
                    {/* List of Holdings */ }
                    <h4>Holdings</h4>
                    <StockList stocks={ convertHoldingsToListing() } trend_name="Today's Price" col1_name='Current Price' col2_name='Number of Holdings' />
                </div>
            </div>
        </div>
    );
}

export default PaperTrade;
