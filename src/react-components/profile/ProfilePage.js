import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header/Header.js';
import './ProfilePage.css';
import { withRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom';

class ProfilePage extends React.Component {

    render() {
        return (
            <div>
                <Header/>

                <div id="login-header">
                    <h3>Welcome</h3>
                </div>

                <div id="inputDiv">
                    <input class="textbox" type="text" name="username" placeholder="Enter Username"/>
                    <input class="textbox" type="password" name="password" placeholder="Enter Password"/>
                    <input id="submit-button" type="submit" value="Submit" onClick={ this.loginPressed }/>
                </div>

                <div>
                    <ul>
                        <li><a href="#" onClick={ this.handleForgotPassword }>Forgot Password? </a></li>
                        <li><a href="#" onClick={ this.handleSignup }>Sign Up</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default ProfilePage