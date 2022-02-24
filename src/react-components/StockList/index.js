import React from 'react';
import { uid } from 'react-uid';

import StockListElem from '../StockListElem';

import './styles.css';

class StockList extends React.Component {

    constructor(props) {
        super(props);
    }

    compareStock(s1, s2) {
        if (s1.val1 === s2.val1) {
            return s2.val2 - s1.val2;
        } else {
            return s2.val1 - s1.val1;
        }
    }

    render() {
        let { stocks } = this.props;

        stocks = stocks.sort(this.compareStock);

        return (
            <div>
                <table className='stockList'>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Trend</th>
                            <th>This Year</th>
                            <th>This Month</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocks.map(
                                stock => (<StockListElem key={ uid(stock) } stock={ stock }/>)
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default StockList;
