import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { uid } from 'react-uid';

import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { BiSearch } from 'react-icons/bi';

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import './styles.css';

import FiveStar from '../FiveStar';

import { getStocksPrefix } from '../../actions/stockListing';

function render_trend(trend) {
    const labels = [];
    let dateFilterStart = new Date();
    dateFilterStart.setDate(dateFilterStart.getDate() - 1);
    for (const [index, element] of trend.entries()) {
        if (Date.parse(element.timestamp) >= dateFilterStart) {
            labels.push(index);
        }
    }

    if (labels.length <= 1) {
        return <p>No Data</p>;
    }

    let trend_color = 'rgba(80, 80, 80, 0.7)';
    if (trend.length >= 2) {
        const begin_end_diff = trend[trend.length - 1].price - trend[0].price;
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
        },
        animation: {
            duration: 0
        }
    };

    const data = {
        labels: labels,
        datasets: [
            {data: labels.map((i) => trend[i].price)}
        ]
    };
    return <div className='trendChart'><Line options={ options } data={ data }/></div>;
}

function render_stars(star_num) {
    if (star_num !== -1) {
        return <FiveStar stars={ star_num } />
    } else {
        return <p>No Reviews</p>
    }
}


function StockListing(props) {

    const [colFilter, setColFilter] = useState(['symbol', true]);
    const [searchString, setSearchString] = useState('');
    const [stocks, setStocks] = useState([]);

    const listingColumns = [{name: 'symbol', label: 'Symbol', type: 'symbol', sortable: true}].concat(props.columns);

    useEffect(() => {
        getStocksPrefix(searchString, setStocks);
    }, [searchString]);

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
                    return <td key={ uid(col) }>{ render_trend(stock[col.name]) }</td>;
                case 'price':
                    return <td key={ uid(col) }>{ Math.round(parseFloat(stock[col.name]) * 100.0) / 100.0 }</td>;
                case 'stars':
                    return <td key={ uid(col) }>{ render_stars(stock.week_stars) }</td>;
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

        let dateFilterStart = new Date();
        dateFilterStart.setDate(dateFilterStart.getDate() - 7);
        for (const stock of stockList) {
            stock.week_stars = stock.reviews
                                    .filter(rev => rev.timestamp >= dateFilterStart)
                                    .reduce((acc, rev) => {
                                        return [acc[0] + 1, acc[1] + rev.stars];
                                    }, [0, 0]);
            if (stock.week_stars[0] > 0) { // no reviews
                stock.week_stars = stock.week_stars[1] * 1.0 / stock.week_stars[1];
            } else {
                stock.week_stars = -1;
            }
        }

        const sortFn = colFilter[0] === 'symbol' ? (a, b) => a['symbol'].localeCompare(b['symbol']) : (a, b) => a[colFilter[0]] - b[colFilter[0]];
        let sortedStocks = stockList.sort(sortFn);
        if (!colFilter[1]) {
            sortedStocks = sortedStocks.reverse();
        }

        return <React.Fragment>
            {
                sortedStocks.map(stock => <tr key={ uid(stock) }>
                    {
                        listingColumns.map(col => makeCell(col, stock))
                    }
                </tr>)
            }
        </React.Fragment>
    }

    return <div className='stockListing'>
        <h3>Stock Search</h3>
        <form className='stockSearch'>
            <label>
                <BiSearch />
                <input type='text' value={ searchString } onChange={(e) => setSearchString(e.target.value.toUpperCase())} placeholder='Symbol' />
            </label>
        </form>
        <table className='stockList'>
            <thead>
                <tr>
                    {
                        listingColumns.map(col =>
                            <th key={ uid(col) } className={ col.sortable ? 'clickable' : null} onClick={ () => col.sortable ? handleFilter(col.name) : null }>
                                { col.label }
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
