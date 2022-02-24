import React from 'react';

import './styles.css';

class StockListElem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol,
            ticks: props.ticks,
            val1: props.val1,
            val2: props.val2
        };
    }

    render() {
        const { stock } = this.props;

        return (
            <div className='stockListElem'>
                <ul>
                    <li>{ stock.symbol }</li>
                    <li>{ '[' + String(stock.ticks) + ']' }</li>
                    <li>{ stock.val1 }</li>
                    <li>{ stock.val2 }</li>
                </ul>
            </div>
        )
    }
}

export default StockListElem;
