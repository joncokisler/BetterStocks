import React from 'react';
import './Statistics.css';
import { AiFillStar } from 'react-icons/ai';

class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fiveStar: props.fiveStar,
            fourStar: props.fourStar,
            threeStar: props.threeStar,
            twoStar: props.twoStar,
            oneStar: props.oneStar,
            avg: props.avg,
            numComment: props.numComment,
            graph:  [{label:'5 Star', value:1},
            {label:'4 Star', value: 82},
            {label:'3 Star', value:80},
            {label:'2 Star', value:75},
            {label:'1 Star', value:1}]
        };

    }


    render() {

        return (
            <div className='statsSection'>
                <div className='averageScore'>
                    {this.state.avg}
                </div>
                <p><span className='numComments'>{this.state.numComment} comments have been written</span></p>
                <span className='stars'>
                    <AiFillStar className={`star--percent100`}  size = {40} />
                    <AiFillStar className={`star--percent100`}  size = {40}/>
                    <AiFillStar className={`star--percent100`}  size = {40} />
                    <AiFillStar className={`star--percent0`}  size = {40} />
                    <AiFillStar className={`star--percent0`}  size = {40} />
                </span>
                <div className='bars'>
            
                </div>
            </div>

        )
    }
}

export default Statistics;