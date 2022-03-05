import React from 'react';
import './WriteComment.css';
import FiveStar from '../../FiveStar/index';

class WriteComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.rate,
            temp: props.rate,
            rate: props.rate
        };
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value

        this.setState({
            temp: value
        })
    }

    star1 = () => {
        this.setState({rate: 1});
    }

    star2 = () => {
        this.setState({rate: 2});
    }

    star3 = () => {
        this.setState({rate: 3});
    }

    star4 = () => {
        this.setState({rate: 4});
    }

    star5 = () => {
        this.setState({rate: 5});
    }

    submit = () => {
        this.state.text = this.state.temp
        
        // {console.log(this.state.rate)}
        // {console.log(this.state.text)}
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
                        <textarea className='commentBox' onChange={this.handleInputChange} placeholder='Type your comment here...'/>
                    </label>
                </form>
                <button className='backButton button3' >Back</button>
                <button className='submitButton button3' onClick={this.submit}>Submit</button>
            </div>
        )
    }
}


export default WriteComment;