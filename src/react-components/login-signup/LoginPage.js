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
        signupRedirect: null
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
        this.setState({ signupRedirect: "/signup" })
    }
    loginPressed = () => {
        console.log("Login pressed")
        console.log(`CCHILD-- USERNAME IS ${this.state.username} `)
        console.log(`CHILD--PASSWORD IS ${this.state.password} `)
        const userData = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.handleLoginCallback(userData)
    }
    handleForgotPassword = () => {
        console.log("Forgot password pressed")
    }

    constructor(props) {
        super(props)
        // this.state.profileRedirect = this.props.profileRedirect.bind(this)
        // this.props.handleLoginCallback = this.props.handleLoginCallback.bind(this);
    }

    render() {
        if (this.state.signupRedirect) {
            return <Navigate to={this.state.signupRedirect}></Navigate>
        }
        if (this.props.profileRedirect){
            return <Navigate to="/profile" />
        }
            return (
                <div>
                    <Header />

                    <div id="inputDivLogin">
                        <input className="textbox" type="text" name="username" onChange={this.handleInputChange} value={this.state.username} placeholder="Enter Username" />
                        <input className="textbox" type="password" name="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Enter Password" />
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
