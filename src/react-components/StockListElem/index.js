import React from 'react';

import { AiFillStar } from 'react-icons/ai';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import './styles.css';

class StockListElem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            symbol: props.symbol,
            trend: props.trend,
            val1: props.val1,
            val2: props.val2,
            val1_mode: props.val1_mode
        };
    }

    render_trend(stock) {
        const labels = []
        for (const [index, element] of stock.trend.entries()) {
            labels.push(index);
        }

        const options = {
            events: [],
            elements: {
                point: {
                    radius: 0
                },
                line: {
                    tension: 0.25,
                    borderColor: `rgba(255, 0, 0, 1)`
                }
            },
            maintainAspectRatio: false,
            scales: {
                xAxes: {display: false},
                yAxes: {display: false}
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        };

        const data = {
            labels: labels,
            datasets: [
                {data: labels.map((i) => stock.trend[i])}
            ]
        };
        return <div className='trendChart'><Line options= { options } data={ data }/></div>;
    }

    render_val1(stock) {
        if (stock.val1_mode === 'stars') {
            const stars = [];

            for (let i = 0; i < 5; i++) {
                const stars_rounded = Math.round(parseFloat(stock.val1) * 10.0) / 10;
                if (stars_rounded - i < 1) {
                    stars.push(Math.round(Math.max(0, (stars_rounded - i)) * 100));
                } else {
                    stars.push(100);
                }
            }

            return (
                <span>
                    <AiFillStar className={`star--percent${stars[0]}`} />
                    <AiFillStar className={`star--percent${stars[1]}`} />
                    <AiFillStar className={`star--percent${stars[2]}`} />
                    <AiFillStar className={`star--percent${stars[3]}`} />
                    <AiFillStar className={`star--percent${stars[4]}`} />
                </span>
            );
        } else {
            return String(stock.val1);
        }
    }

    render() {
        const { stock } = this.props;

        return (
            <tr className='stockListElem'>
                <td>{ stock.symbol }</td>
                <td>{ this.render_trend(stock) }</td>
                <td>{ this.render_val1(stock) }</td>
                <td>{ stock.val2 }</td>
            </tr>
        )
    }
}

export default StockListElem;
