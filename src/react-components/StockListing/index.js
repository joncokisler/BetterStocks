import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { uid } from 'react-uid';

import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import './styles.css';

import FiveStar from '../FiveStar';

function render_trend(trend) {
    const labels = []
    for (const [index, element] of trend.entries()) {
        labels.push(index);
    }

    let trend_color = 'rgba(80, 80, 80, 0.7)';
    if (trend.length >= 2) {
        const begin_end_diff = trend[trend.length - 1] - trend[0];
        if (begin_end_diff > 0) {
            trend_color = 'rgba(30, 150, 0, 0.7)';
        } else if (begin_end_diff < 0) {
            trend_color = 'rgba(250, 33, 58, 0.7)';
        }
    }

    const options = {
        events: [],
        elements: {
            point: {
                radius: 0
            },
            line: {
                tension: 0.25,
                borderColor: trend_color
            }
        },
        maintainAspectRatio: false,
        scales: {
            xAxes: {display: false},
            yAxes: {display: false}
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

    const data = {
        labels: labels,
        datasets: [
            {data: labels.map((i) => trend[i])}
        ]
    };
    return <div className='trendChart'><Line options={ options } data={ data }/></div>;
}


function StockListing(props) {

    const [colFilter, setColFilter] = useState(['symbol', true]);

    const listingColumns = [{name: 'Symbol', type: 'symbol', sortable: true}].concat(props.columns);

    const stocks = [
        {symbol: 'AAPL', trace: [73, 23, 38, 45], price: -100, stars: 5.00},
        {symbol: 'AMD', trace: [85, 92, 66, 12], price: 165, stars: 3.234},
        {symbol: 'INTC', trace: [54, 57, 29, 36], price: 148, stars: 3.823},
        {symbol: 'NVDA', trace: [11, 33, 47, 37], price: 207, stars: 2.356},
        {symbol: 'TSLA', trace: [73, 78, 82, 22], price: 207, stars: 1.982735},
      ]

    function handleFilter(col) {
        const c = col.toLowerCase();
        const [colFilterName, colFilterDir] = colFilter;
        if (colFilterName !== c) {
            if (c === 'symbol') {
                setColFilter([c, true]);
            } else {
                setColFilter([c, false]);
            }
        } else {
            setColFilter([c, !colFilterDir]);
        }
    }

    function drawFilterArrow(col) {
        if (col.toLowerCase() === colFilter[0]) {
            return colFilter[1] ? <GoTriangleUp /> : <GoTriangleDown />
        } else {
            return null;
        }
    }

    function makeTableBody(stockList) {
        function makeCell(col, stock) {
            switch (col.type.toLowerCase()) {
                case 'symbol':
                    return <td key={ uid(col) }><NavLink className='stockSymbol' to={ `/stocks?symbol=${ stock.symbol }` }>{ stock.symbol }</NavLink></td>
                case 'trace':
                    return <td>{ render_trend(stock['trace']) }</td>;
                case 'price':
                    return <td key={ uid(col) }>{ stock['price'] }</td>;
                case 'stars':
                    return <td key={ uid(col) }><FiveStar stars={ stock['stars'] } /></td>;
                default:
                    class ColumnTypeError extends Error {
                        constructor(message) {
                            super(message);
                            this.name = 'ColumnTypeError';
                        }
                    }
                    throw new ColumnTypeError(`Invalid column type of "${col.type}"`);
            }
        }
        let sortedStocks = stockList.sort((a, b) => a[colFilter[0]] - b[colFilter[0]]);
        if (!colFilter[1]) {
            sortedStocks = sortedStocks.reverse();
        }

        return <React.Fragment>
            {
                stockList.map(stock => <tr key={ uid(stock) }>
                    {
                        listingColumns.map(col => makeCell(col, stock))
                    }
                </tr>)
            }
        </React.Fragment>
    }

    return <div className='stockListing'>
        <table className='stockList'>
            <thead>
                <tr>
                    {
                        listingColumns.map(col =>
                            <th key={ uid(col.name) } className={ col.sortable ? 'clickable' : null} onClick={ () => col.sortable ? handleFilter(col.name) : null }>
                                { col.name }
                                { col.sortable ? drawFilterArrow(col.name) : null}
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                { makeTableBody(stocks) }
            </tbody>
        </table>
    </div>
}

export default StockListing;
