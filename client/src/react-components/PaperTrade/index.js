import React, { useEffect, useState } from 'react';

import StockList from '../StockList';

import { getUsername, getUserInfo, getStocks, buyStock } from '../../actions/paperTrade';

import './styles.css';

const ALL_STOCKS = [  // price temporarily a list to simulate price changes
    {symbol: 'AAPL', price: [73, 23, 38, 45]},
    {symbol: 'AMD', price: [85, 92, 66, 12]},
    {symbol: 'INTC', price: [54, 57, 29, 36]},
    {symbol: 'NVDA', price: [11, 33, 47, 37]},
    {symbol: 'TSLA', price: [73, 78, 82, 22]},
];

function PaperTrade() {
    const [initBalance, setInitBalance] = useState(0);

    const [balance, setBalance] = useState(initBalance ? initBalance : 1);  // money available to trade with
    const [value, setValue] = useState(0);  // value of stock holdings
    const [perfPercent, setPerfPercent] = useState(((value + balance - initBalance) / initBalance) * 100);

    const [stockSymbol, setStockSymbol] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /* Stock holdings formatted as:
        {SYMBOL: {
            currPrice: PRICE,
            numHoldings: HOLDINGS
        }}
    */
    const [stockHoldings, setStockHoldings] = useState({});
    
    // user related
    const [username, setUsername] = useState('');
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {getUsername(setUsername)}, []);
    useEffect(() => {getUserInfo(username, setUserInfo)}, [username, balance]);
    useEffect(() => {
        try {
            setBalance(userInfo.paperTrade.capital);
            setInitBalance(userInfo.paperTrade.totalMoneyIn);
            setStockHoldings(userInfo.paperTrade.holdings);
            setPerfPercent(((value + balance - initBalance) / initBalance) * 100)
        } catch (error) {
        }
    }, [userInfo]);
    useEffect(() => {setPerfPercent(((value + balance - initBalance) / initBalance) * 100)}, [value, balance, initBalance]);
    useEffect(() => {
        try {
            const stocks = userInfo.paperTrade.holdings.map(h => (
                {stock: h.stock, units: h.units}
            ));
            getStocks(stocks, setStockHoldings);
        } catch (error) {
        }
    }, [userInfo]);
    useEffect(() => {
        setValue(Object.entries(stockHoldings).reduce((v, keyValue) => {
            const [s, info] = keyValue;
            return v + (info.price * info.units);
        }, 0));
    }, [userInfo]);

    /* Handle a buy/sell event */
    function stockBuySell(e) {
        e.preventDefault();
        switch ( e.nativeEvent.submitter.name ) {
            case 'buy':
                buyStock(stockSymbol, setBalance, setErrorMessage);
                break;

            case 'sell':
                if (stockSymbol in stockHoldings) {
                    const stockPrices = ALL_STOCKS.filter((s) => s.symbol === stockSymbol)[0].price;
                    const randPrice = stockPrices[Math.floor(Math.random() * stockPrices.length)];
                    stockHoldings[stockSymbol].numHoldings--;
                    stockHoldings[stockSymbol].currPrice = randPrice;
                    
                    if (stockHoldings[stockSymbol].numHoldings === 0) {
                        delete stockHoldings[stockSymbol];
                    }
                    setBalance(balance + randPrice);
                    setStockHoldings(stockHoldings);
                }
                break;

            default:
                console.log('NO MATCH');  // should never hit this
        }
    }

    /* Convert from the stock holdings object format to the required list format */
    function convertHoldingsToListing() {
        function compareHoldings(h1, h2) {
            return h1[1].stock - h2[1].stock;
        }

        const holdingsArr = Object.entries(stockHoldings).sort(compareHoldings);
        return holdingsArr.reduce((holdings, keyValue) => {
            const [s, info] = keyValue;
            if (info.units > 0) {
                holdings.push({
                    symbol: info.stock,
                    trend: [],  // TODO add price trace
                    val1: info.price,
                    val2: info.units
                });
            }
            return holdings;
        }, [])
    }

    return (
        <div className='paperTrade'>
            <div className='content'>
                <h3>Paper Trade</h3>

                <div className='topInfo'>
                    {/* Portfolio Statistics */}
                    <div className='statistics'>
                        <div className='statistic'>
                            <strong>Current Balance</strong>
                            <p>{ `$${balance.toFixed(2)}` }</p>
                        </div>
                        <div className='statistic'>
                            <strong>Portfolio Value</strong>
                            <p>{ `$${(balance + value).toFixed(2)}` }</p>
                        </div>
                        <div className='statistic'>
                            <strong>All Time Performance</strong>
                            <p>{ `${perfPercent.toFixed(2)}%` }</p>
                        </div>
                    </div>

                    {/* Buy/Sell buttons */}
                    <form className='buySell' onSubmit={ stockBuySell } >
                        <label>
                            Stock:
                            <input type='text' value={ stockSymbol } onChange={(e) => setStockSymbol(e.target.value.toUpperCase())} placeholder='Symbol' />
                        </label>
                        <input type='submit' name='buy' value='Buy' />
                        <input type='submit' name='sell' value='Sell' />
                        <p>{ errorMessage }</p>
                    </form>
                </div>

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
