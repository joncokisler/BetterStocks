import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header/Header.js';
import './LoginPage.css';
import { withRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import SignupPage from './SignupPage.js';

class LoginPage extends React.Component {


    state = {
        username: "",
        password: "",
        validPasswordConfirm: false,
        signupRedirect:null
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    handleSignup = () => {
        console.log("Signup pressed")
        this.setState({signupRedirect:"/signup"})
    }
    loginPressed = () => {
        console.log("Login pressed")
        console.log(`USERNAME IS ${this.state.username} `)
    }
    handleForgotPassword = () => {
        console.log("Forgot password pressed")
    }

    render() {
        if(this.state.signupRedirect){
            return <Navigate to={this.state.signupRedirect}></Navigate>
        }
        return (
            <div>
                <Header />

                <div id="inputDiv">
                    <input class="textbox" type="text" name="username" onChange={this.handleInputChange} value={this.state.username} placeholder="Enter Username" />
                    <input class="textbox" type="password" name="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Enter Password" />
                    <input id="submit-button" type="submit" value="Log In" onClick={this.loginPressed} />
                


                    <ul>
                        <li><a href="#" onClick={this.handleForgotPassword}>Forgot Password? </a></li>

                        <li><a href="#" onClick={this.handleSignup}>Sign Up</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default LoginPage