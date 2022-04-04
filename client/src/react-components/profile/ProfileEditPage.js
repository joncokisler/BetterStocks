import React from "react";
import { uid } from "react-uid";
import "./ProfilePage.css";
import { NavLink, withRouter } from "react-router-dom";

class ProfileEditPage extends React.Component {
	state = {
		//no need for these states, will be props when backend implemented
		loggedInUser: {
			displayName: "",
			userName: "",
			//
			watchlist: [],
			bio: "",
			profilePicture: "", //profile picture is a url-based image at the moment
			phoneNumber: "",
			email: "",
			isAdmin: false,
		},

		stockList: [],
	};

	constructProfileElements = async () => {
		let currentUsername;
		let currentUserID;
		await fetch("/users/check-session", {
			method: "GET",
			headers: {
				Accept: "application/json text/plain, */*",
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (!response.ok) console.log("check session response is not okay");
			else {
				currentUsername = response.body.username;
				currentUserID = response.body.userID;
			}
		});

		await fetch(`/api/users/:${currentUsername}`, {
			method: "GET",
			headers: {
				Accept: "application/json text/plain, */*",
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (!response.ok) console.log("user data gathering response is not okay");
			else {
				this.setState({ loggedInUser: response.body });
			}
		});
	};

	handleEditData = () => {
		// api calls
		console.log("This is the edited state", this.state);
	};

	doApiCalls = async () => {
		fetch("/api/users/", {
			method: "PATCH",
			headers: {
				Accept: "application/json text/plain, */*",
				"Content-Type": "application/json",
			},
			body: [
				JSON.stringify({
					op: "replace",
					path: "/email",
					value: this.state.email,
				}),
				JSON.stringify({
					op: "replace",
					path: "/displayName",
					value: this.state.displayName,
				}),
				JSON.stringify({
					op: "replace",
					path: "/phone",
					value: this.state.phoneNumber,
				}),
				JSON.stringify({
					op: "replace",
					path: "/bio",
					value: this.state.bio,
				}),
			],
		}).then((response) => {
			console.log(response);
			if (!response.ok) console.log("Problem in editing profile");
			else this.setState({ loggedInUser: response.json() });
			console.log(this.state.loggedInUser);
		});
	};

	constructor(props) {
		super(props);

		this.constructProfileElements();

		this.state = {
			loggedInUser: {
				watchlist: this.props.loggedInUser.watchlist,
				displayName: this.props.loggedInUser.displayName,
				userName: this.props.loggedInUser.userName,
				bio: this.props.loggedInUser.bio,

				profilePicture: this.props.loggedInUser.profilePicture, //profile picture is a url-based image at the moment

				phoneNumber: this.props.loggedInUser.phoneNumber,
				email: this.props.loggedInUser.email,
				isAdmin: this.props.loggedInUser.isAdmin,
			},
		};
	}
	//THE COMPONENTS WILL RELY ON API CALLS TO THE SERVER TO FILL
	// IN THE DATA
	render() {
		return (
			<div>
				<div id="profile-edit">
					<input
						className="textbox"
						type="text"
						name="bio"
						onChange={this.handleInputChange}
						value={this.state.bio}
						placeholder="Bio"
					/>
					<input
						className="textbox"
						type="text"
						name="display-name"
						onChange={this.handleInputChange}
						value={this.state.displayName}
						placeholder="Display Name"
					/>
					<input
						className="textbox"
						type="text"
						name="bio"
						onChange={this.handleInputChange}
						value={this.state.bio}
						placeholder="Phone number"
					/>
					<input
						className="textbox"
						type="text"
						name="display-name"
						onChange={this.handleInputChange}
						value={this.state.displayName}
						placeholder="Email"
					/>
					<input
						id="submit-button-login"
						type="submit"
						value="Submit"
						onClick={this.handleEditData}
					/>
				</div>
			</div>
		);
	}
}

export default ProfileEditPage;
