import React from "react";
import ReactDOM from "react-dom";
import Header from "../header/Header.js";
import "./LoginPage.css";
import { withRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SignupPage from "./SignupPage.js";

class LoginPage extends React.Component {
	state = {
		username: "",
		password: "",
		validPasswordConfirm: false,
		signupRedirect: null,
	};

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	};

	handleSignup = () => {
		console.log("Signup pressed");
		this.setState({ signupRedirect: "/signup" });
	};

	loginPressed = () => {
		const userData = {
			username: this.state.username,
			password: this.state.password,
		};
		const userJSON = JSON.stringify(userData);

		const currentUser = this.props.handleLoginCallback(userJSON);
	};

	handleForgotPassword = () => {
		console.log("Forgot password pressed");
	};

	constructor(props) {
		super(props);
		const a = 5;
	}

	handleLoginCallbackServer = (userJSON) => {
		const response = fetch("http://localhost:3100/users/login", {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: userJSON,
		});
		if (!response.ok);
		else return response.json();
	};

	render() {
		if (this.state.signupRedirect) {
			return <Navigate to={this.state.signupRedirect}></Navigate>;
		}
		if (this.props.profileRedirect) {
			return <Navigate to="/profile" />;
		}
		return (
			<div>
				<Header />

				<div id="inputDivLogin">
					<input
						className="textbox"
						type="text"
						name="username"
						onChange={this.handleInputChange}
						value={this.state.username}
						placeholder="Enter Username"
					/>
					<input
						className="textbox"
						type="password"
						name="password"
						onChange={this.handleInputChange}
						value={this.state.password}
						placeholder="Enter Password"
					/>
					<input
						id="submit-button"
						type="submit"
						value="Log In"
						onClick={this.loginPressed}
					/>

					<ul>
						<li>
							<a href="#" onClick={this.handleForgotPassword}>
								Forgot Password?{" "}
							</a>
						</li>

						<li>
							<a href="#" onClick={this.handleSignup}>
								Sign Up
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default LoginPage;
