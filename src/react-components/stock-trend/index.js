import React from 'react';
import { useSearchParams } from 'react-router-dom';

import './styles.css';

function Stock() {
    let [params, setParams] = useSearchParams();

    return <p>{ params.get('symbol') }</p>
}

export default Stock;
