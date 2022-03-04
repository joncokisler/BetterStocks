import React from 'react';
import './WriteComment.css';
import FiveStar from '../../FiveStar/index';

class WriteComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            rate: props.rate
        };
    }

    star1 = () => {
        this.setState({rate: 1});
        console.log(this.state.rate);
    }

    star2 = () => {
        this.setState({rate: 2});
        console.log(this.state.rate);
    }

    star3 = () => {
        this.setState({rate: 3});
        console.log(this.state.rate);
    }

    star4 = () => {
        this.setState({rate: 4});
        console.log(this.state.rate);
    }

    star5 = () => {
        this.setState({rate: 5});
        console.log(this.state.rate);
    }

    render() {
        return (
            <div className='commentSection'>    
                 <div className='stars'>
                    <FiveStar stars={5} size_mult={2.5} />
                </div>
                <div className='blackStars'>
                    <FiveStar stars={this.state.rate} size_mult={2.5} />
                </div>
                
                <button onClick={this.star1} className='star1'>10</button>
                <button onClick={this.star2} className='star2'>10</button>
                <button onClick={this.star3} className='star3'>10</button>
                <button onClick={this.star4} className='star4'>10</button>
                <button onClick={this.star5} className='star5'>10</button>
               
                
                <form >
                    <label>
                        <textarea name="body" value={this.state.value} className='commentBox' placeholder='Type your comment here...'/>
                    </label>
                </form>
                <button className='backButton button3'>Back</button>
                <button className='submitButton button3'>Submit</button>
            </div>
        )
    }
}


export default WriteComment;