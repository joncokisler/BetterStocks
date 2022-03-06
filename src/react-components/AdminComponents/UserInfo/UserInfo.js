import React from 'react';
import './UserInfo.css'

class UserInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: props.userName,
            displayName: props.displayName,
            profilePicture: props.profilePicture,
            email: props.email,
            phone: props.phone
        };
    }

    onTrigger = () => {
        this.props.parentCallBack(this.state.userName);
    }

    render() {

        return (
            <div className='userSection'>
                    <div className='user'>
                        <div className='IconContainer'>
                            <img className="Icon" src={this.state.profilePicture} />
                        </div>

                        <div className='Content'>
                            <h2>{this.state.displayName} </h2>
                            <h2><span className="small"> @{this.state.userName} </span></h2>
                            <div className='textContent'>
                                <p>
                                    {this.state.email}
                                </p>
                                <p>
                                    {this.state.phone}
                                </p>
                                
                            </div>
                        </div>
                        <button className='addToBlackListButton button1' onClick={this.onTrigger}>Add to BlackList</button>
                        <button className='editButton button1'>Edit</button>
                    </div>
                </div>
        )
    }

}

export default UserInfo;