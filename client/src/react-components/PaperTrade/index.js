import React, { useEffect, useState } from 'react';

import StockList from '../StockList';

import { getUsername, getUserInfo, getStocks, buyStock, sellStock } from '../../actions/paperTrade';

import './styles.css';

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
            setPerfPercent(((value + balance - initBalance) / initBalance) * 100)
            const stocks = userInfo.paperTrade.holdings.map(h => (
                {stock: h.stock, units: h.units}
            ));
            getStocks(stocks, setStockHoldings);
        } catch (error) {
        }
    }, [userInfo]);
    useEffect(() => {
        try {
            const stocks = userInfo.paperTrade.holdings.map(h => (
                {stock: h.stock, units: h.units}
            ));
            getStocks(stocks, setStockHoldings);
            setValue(Object.entries(stockHoldings).reduce((v, keyValue) => {
                const [s, info] = keyValue;
                return v + (info.price * info.units);
            }, 0));
            setPerfPercent(((value + balance - initBalance) / initBalance) * 100);
        } catch (error) {
        }
    }, [value, balance, initBalance]);

    /* Handle a buy/sell event */
    function stockBuySell(e) {
        e.preventDefault();
        switch ( e.nativeEvent.submitter.name ) {
            case 'buy':
                buyStock(stockSymbol, setBalance, setErrorMessage);
                break;

            case 'sell':
                sellStock(stockSymbol, setBalance, setErrorMessage);
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
            let filterStart = new Date();
            filterStart.setDate(filterStart.getDate() - 1);
            const trend = info.history
                            .filter(entry => Date.parse(entry.timestamp) >= filterStart)
                            .map(entry => entry.price)
                            .concat([info.price]);
            if (info.units > 0) {
                holdings.push({
                    symbol: info.stock,
                    trend: trend,
                    val1: Number(info.price).toFixed(2),
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
