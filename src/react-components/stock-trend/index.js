import React from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import NavBar from '../navbar/Navbar';

import './styles.css';

function Stock() {
    const [params, setParams] = useSearchParams();

    

    return (
        <div className='stockPage'>
            <NavBar />
            <p>{ params.get('symbol') }</p>
            <div className='stock'>
                This is the stock trend. API has not been implemented.
            </div>
            <div className='statistics'>
                <div className='scoreSummary'>
                    <h1>3.0</h1>
                    <h2>out of 5.0</h2>
                    <NavLink to={ `reviews?symbol=${params.get('symbol')}` }>Review History</NavLink>
                </div>
            </div>
            <div id='link'>
                <ul>
                    <li><a href='#'>1D<span className="unit" ></span></a></li>
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
    );
}

export default Stock;
