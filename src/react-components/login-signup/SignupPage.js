import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header/Header.js';
import './SignupPage.css';
import { withRouter } from "react-router-dom";

class SignupPage extends React.Component {

    state = {
        displayName: "",
        username:"",
        password:"",
        confirmPassword:"",
        validPasswordConfirm: false
    }

    handleInputChange = (event) =>{
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }

    submitInfo = () => {
        console.log("submitting sugnup info")

        const user = {
            displayName: this.state.displayName,
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }

        if(this.state.confirmPassword === this.state.password){
            console.log("PASSWORDS MATCH")
            this.setState({
                signedUpUser: user
            })
        }
        else{
            console.log("PASSWORDS DO NOT MATCH")
            /*
            handle this
            */
        }
    }

    render() {
        return (
            <div>
                <Header/>

                <div id="inputDiv">
                    <input type="text" name="displayName" onChange={ this.handleInputChange } value={ this.state.displayName } placeholder="Display Name"/>
                    <input type="text" name="username" onChange={ this.handleInputChange } value={ this.state.username } placeholder="Username"/>
                    <input type="password" name="password" onChange={ this.handleInputChange } value={ this.state.password } placeholder="Password"/>
                    <input type="password" name="confirmPassword" onChange={ this.handleInputChange } value={ this.state.confirmPassword } placeholder="Confirm Password"/>
                    <input id="submit-button" type="submit" value="Submit" onChange={ this.handleInputChange } onClick={this.submitInfo}/>
                </div>

            </div>
        )
    }
}
export default SignupPage