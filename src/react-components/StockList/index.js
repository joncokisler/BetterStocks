import React from 'react';

import StockListElem from '../StockListElem';

import './styles.css';

class StockList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='stockList'>
                <ol>
                    <li><StockListElem className='stockListElem' symbol='TSLA' ticks={ [1,2,3,4] } val1={ 207 } val2={ 30 } /></li>
                    <li><StockListElem className='stockListElem' symbol='AMD' ticks={ [1,2,3,4] } val1={ 165 } val2={ 25 } /></li>
                    <li><StockListElem className='stockListElem' symbol='INTC' ticks={ [1,2,3,4] } val1={ 148 } val2={ 20 } /></li>
                    <li><StockListElem className='stockListElem' symbol='NVDA' ticks={ [1,2,3,4] } val1={ 108 } val2={ 20 } /></li>
                    <li><StockListElem className='stockListElem' symbol='AAPL' ticks={ [1,2,3,4] } val1={ -100 } val2={ 5 } /></li>
                </ol>
            </div>
        )
    }
}

export default StockList;
