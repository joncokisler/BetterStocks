import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header/Header.js';
class LoginPage extends React.Component {
    render() {
        return (
            <div>
                <Header/>

                <div>
                    <h3>Welcome</h3>
                </div>

                <div>
                    <input type="text" name="username" placeholder="Enter Username"/>
                    <input type="password" name="password" placeholder="Enter Password"/>
                </div>

                <div>
                    <ul>
                        <li><a>Forgot Password? </a></li>
                        <li><a>Log In</a></li>
                        <li><a>Sign Up</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}