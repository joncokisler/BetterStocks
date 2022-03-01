import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header/Header.js';
import './ProfilePage.css';
import { withRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom';

class ProfilePage extends React.Component {

    state ={
        watchlist:"",
        bio:"This is a bio",
        profilePicture:"", //profile picture is a url-based image at the moment
        contactInfo: {
            phoneNumber:null,
            email:"placeholder@email.com",
        }
    }

    constructor (props) {
        super(props);
        //do api calls to assu=ign values to states

        //this.setState()

    }
    //THE COMPONENTS WILL RELY ON API CALLS TO THE SERVER TO FILL
    // IN THE DATA
    render() {
        return (
            <div id="profile-page">
                <div id="contact-info">
                    <h2 id="displayName">{ this.props.displayName }</h2>
                    <h2 id="userName">{ this.props.username }</h2>
                    <p id="bio">{ this.state.bio }</p>
                    <p id="phone-number">{ this.state.phoneNumber }</p>
                    <a id="change-password">Change Password</a>
                </div>

                <div id="watchlist-section">
                    <h2>My Watchlist</h2>

                </div>
                
            </div>
        )
    }
}

export default ProfilePage