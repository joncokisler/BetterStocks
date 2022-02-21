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
        return (
            <div className='stockListElem'>
                <ul>
                    <li>{ this.state.symbol }</li>
                    <li>{ '[' + String(this.state.ticks) + ']' }</li>
                    <li>{ this.state.val1 }</li>
                    <li>{ this.state.val2 }</li>
                </ul>
            </div>
        )
    }
}

export default StockListElem;
