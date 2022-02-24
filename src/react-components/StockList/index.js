import React from 'react';
import { uid } from 'react-uid';

import StockListElem from '../StockListElem';

import './styles.css';

class StockList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { stocks } = this.props;

        return (
            <div className='stockList'>
                <ol>
                    {
                        stocks.map(
                            stock => (<li key={ uid(stock) }><StockListElem stock={ stock }/></li>)
                        )
                    }
                </ol>
            </div>
        )
    }
}

export default StockList;
