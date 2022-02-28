import React from 'react';
import './Comment.css';

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: props.userName,
            displayName: props.displayName,
            profilePicture: props.profilePicture,
            rate: props.rate,
            text: props.text
        };
    }

    render() {

        return (
            //     <div className='betterStocksContainer'>
            //         <img className='betterStocksIcon' src={bird} />
            //         <a className='betterStocks'>BetterStocks</a>


            //         <a className='sectionTitle'>Top Stocks</a>
            //         <a className='sectionTitle'>Trending</a>
            //         <a className='sectionTitle'>Search</a>
                    
            //     </div>
                <div className='reviewSection'>
                    <div className='review'>
 		
                        <div className='IconContainer'>
                            <img className="Icon" src={this.state.profilePicture} />
                        </div>

                        <div className='Content'>
                            <h2>{this.state.displayName} <span className="grey"> gave {this.state.rate} Star</span></h2>
                            <h2><span className="small"> @{this.state.userName} </span></h2>
                            <div className='textContent'>
                                <p>
                                    {this.state.text}
                                </p>
                            </div>
                        </div>
                    </div>
{/* 
                    <div class='timelineHeader'></div> */}
                </div>
        )
    }
}

export default Comment;