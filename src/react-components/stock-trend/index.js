import React from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import NavBar from '../navbar/Navbar';

import './styles.css';

function Stock() {
    const [params, setParams] = useSearchParams();

    function renderLineChart() {
        const options = {}
        const data = {
            labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
            datasets: [
                {
                    label: params.get('symbol').toUpperCase(),
                    data: [96, 49, 74, 3, 78, 30, 63, 33, 41, 77, 87, 32, 100, 5, 42, 87, 30, 11, 94, 23]
                }
            ]
        }
        return <Line options={ options } data={ data }/>
    }

    return (
        <div className='stockPage'>
            <h3>{ params.get('symbol') }</h3>

            <div className='stockContent'>
                <div className='stock'>
                    { renderLineChart() }
                </div>
                <div id='link'>
                    <ul>
                        <li><a href='#'>1D<span className="unit"></span></a></li>
                        <li><a href='#'>1W<span className="unit"></span></a></li>
                        <li><a href='#'>1M<span className="unit"></span></a></li>
                        <li><a href='#'>3M<span className="unit"></span></a></li>
                        <li><a href='#'>6M<span className="unit"></span></a></li>
                        <li><a href='#'>1Y<span className="unit"></span></a></li>
                    </ul>
                </div>
                <table className='dataTable'>
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
                    </table>
                </div>
                
                <div className='statistics'>
                    <div className='scoreSummary'>
                        <h1>3.0</h1>
                        <h2>out of 5.0</h2>
                        <NavLink to={ `reviews?symbol=${params.get('symbol')}` }>Review History</NavLink>
                    </div>
                </div>
        </div>
    );
}

export default Stock;
