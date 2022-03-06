import React from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';

import './styles.css';

function Stock() {
    let [params, setParams] = useSearchParams();

    

    return (
        <div className='stockPage'>
            <p>{ params.get('symbol') }</p>
            <NavLink to={ `reviews?symbol=${params.get('symbol')}` }>Reviews</NavLink>
        </div>
    );
}

export default Stock;
