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
            <tr className='stockListElem'>
                <td>{ stock.symbol }</td>
                <td>{ '[' + String(stock.ticks) + ']' }</td>
                <td>{ stock.val1 }</td>
                <td>{ stock.val2 }</td>
            </tr>
        )
    }
}

export default StockListElem;
