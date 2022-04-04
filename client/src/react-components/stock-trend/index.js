import React, { useEffect, useState } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

import { getStockInfo } from '../../actions/stockPage';

import './styles.css';

function getDateFilterStart(dateFilter) {
    let dateFilterStart = new Date();
    switch (dateFilter.charAt(dateFilter.length - 1)) {
        case 'D':
            if (dateFilterStart.getDay() === 6) {  // Saturday
                dateFilterStart.setDate(dateFilterStart.getDate() - 2);
            } else if (dateFilterStart.getDay() === 0) {  // Sunday
                dateFilterStart.setDate(dateFilterStart.getDate() - 3);
            } else {
                dateFilterStart.setDate(dateFilterStart.getDate() - 4);
            }
            break;
        case 'W':
            dateFilterStart.setDate(dateFilterStart.getDate() - 7);
            break;
        case 'M':
            dateFilterStart.setMonth(dateFilterStart.getMonth() - Number(dateFilter.slice(0, -1)));
            break;
        case 'Y':
            dateFilterStart.setFullYear(dateFilterStart.getFullYear() - 1);
        default:
            // should never reach
            break;
    }

    return dateFilterStart;
}

function Stock() {
    const [params, setParams] = useSearchParams();
    const [stockInfo, setStockInfo] = useState(null);
    const [timeFilter, setTimeFilter] = useState('1D');

    useEffect(() => {
        getStockInfo(params.get('symbol'), setStockInfo);
    }, [params])

    function renderLineChart() {
        const dateFilterStart = getDateFilterStart(timeFilter);
        const filteredHistory = stockInfo.history.filter(h => Date.parse(h.timestamp) >= dateFilterStart);
        const options = {
            scales: {
                x: {
                    type: 'timeseries',
                    time: {
                        minUnit: 'hour'
                    }
                }
            }
        };
        const data = {
            labels: filteredHistory.map(s => {
                return new Date(s.timestamp);
            }),
            datasets: [
                {
                    label: params.get('symbol').toUpperCase(),
                    data: filteredHistory.map(s => s.price)
                }
            ]
        }
        return <Line options={ options } data={ data }/>
    }

    function renderNotFound() {
        return <React.Fragment>
                <h3>Stock not found!</h3>
            </React.Fragment>;
    }

    function renderStockInfo() {
        return <React.Fragment>
                <h3>{ params.get('symbol') }</h3>

                { [0, 6].includes((new Date()).getDay()) ? <p>Markets are currently <strong>closed!</strong>&nbsp;&nbsp;Price data is shown for the last open trading day.</p> : null }

                <div className='stockContent'>
                    <div className='stock'>
                        { renderLineChart() }
                    </div>
                    <div id='link'>
                        <button value='1D' onClick={ e => setTimeFilter(e.target.value) }>1D</button>
                        <button value='1W' onClick={ e => setTimeFilter(e.target.value) }>1W</button>
                        <button value='1M' onClick={ e => setTimeFilter(e.target.value) }>1M</button>
                        <button value='3M' onClick={ e => setTimeFilter(e.target.value) }>3M</button>
                        <button value='6M' onClick={ e => setTimeFilter(e.target.value) }>6M</button>
                        <button value='1Y' onClick={ e => setTimeFilter(e.target.value) }>1Y</button>
                    </div>
                    {/* <table className='dataTable'>
                            <thead>
                                <tr>
                                    <th>52WK High</th>
                                    <th>52WK Low</th>
                                    <th>MKTCAP</th>
                                    <th>VOLUME</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.24k</td>
                                    <td>539.48</td>
                                    <td>940.17b</td>
                                    <td>26.29m</td>
                                </tr>
                            </tbody>
                        </table> */}
                </div>
                    
                <div className='statistics'>
                    <div className='scoreSummary'>
                        <h1>3.0</h1>
                        <h2>out of 5.0</h2>
                        <NavLink to={ `reviews?symbol=${params.get('symbol')}` }>Review History</NavLink>
                    </div>
                </div>
                </React.Fragment>
    }

    return (
        <div className='stockPage'>
            { stockInfo ? null : renderNotFound() }

            { stockInfo ? renderStockInfo() : null}
        </div>
    );
}

export default Stock;
