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
	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value,
		});
	};

	constructProfileElements = async () => {
		let currentUsername;
		let currentUserID;

		const sessionResponse = await fetch("/users/check-session", {
			method: "GET",
			headers: {
				Accept: "application/json text/plain, */*",
				"Content-Type": "application/json",
			},
			credentials: "include",
		});
		const sessionResponseJSON = await sessionResponse.json();
		console.log(sessionResponseJSON);

		if (!sessionResponse.ok) {
			console.log("check session response is not okay");
			console.log("---STOP users/check-sesion ---");
			return;
		}
		currentUsername = sessionResponseJSON.username;
		currentUserID = sessionResponseJSON.userID;

		let response = await fetch(`/api/users/${currentUsername}`, {
			method: "GET",
			headers: {
				Accept: "application/json text/plain, */*",
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) console.log("user data gathering response is not okay");
		response = await response.json();
		console.log(response);
		this.setState({ loggedInUser: response });

		// fetch("/users/check-session", {
		// 	method: "GET",
		// 	headers: {
		// 		Accept: "application/json text/plain, */*",
		// 		"Content-Type": "application/json",
		// 	},
		// 	credentials: "include",
		// }).then((response) => {
		// 	console.log(response.json());
		// 	if (!response.ok) console.log("check session response is not okay");
		// 	else {
		// 		currentUsername = response.body.username;
		// 		currentUserID = response.body.userID;
		// 		console.log(response.body);
		// 	}
		// 	fetch(`/api/users/${currentUsername}`, {
		// 		method: "GET",
		// 		headers: {
		// 			Accept: "application/json text/plain, */*",
		// 			"Content-Type": "application/json",
		// 		},
		// 	}).then((response) => {
		// 		if (!response.ok)
		// 			console.log("user data gathering response is not okay");
		// 		else {
		// 			this.setState({ loggedInUser: response.body });
		// 		}
		// 	});
		// });
	};

	handleEditData = () => {
		// api calls
		console.log("This is the edited state", this.state);
	};

	submitEditInfo = async () => {
		const patchResponse = await fetch("./api/users/", {
			method: "PATCH",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify([
				{
					op: "replace",
					path: "/email",
					value: this.state.email,
				},
				{
					op: "replace",
					path: "/displayName",
					value: this.state.displayName,
				},
				{
					op: "replace",
					path: "/phone",
					value: this.state.phoneNumber,
				},
				// JSON.stringify({
				// 	op: "replace",
				// 	path: "/bio",
				// 	value: this.state.bio,
				// }),
			]),
		});
		console.log("THIS EXECUTED");
		const patchResponseJson = patchResponse;
		console.log(patchResponseJson);
		if (!patchResponse.ok) console.log("Problem in patch request profile");
		else this.setState({ loggedInUser: patchResponse });
		console.log(this.state.loggedInUser);
	};

	constructor(props) {
		super(props);

		this.constructProfileElements();
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
						name="displayName"
						onChange={this.handleInputChange}
						value={this.state.displayName}
						placeholder="Display Name"
					/>
					<input
						className="textbox"
						type="text"
						name="phoneNumber"
						onChange={this.handleInputChange}
						value={this.state.phoneNumber}
						placeholder="Phone number"
					/>
					<input
						className="textbox"
						type="text"
						name="email"
						onChange={this.handleInputChange}
						value={this.state.email}
						placeholder="Email"
					/>
					<input
						id="submit-button-login"
						type="submit"
						value="Submit"
						onClick={this.submitEditInfo}
					/>
				</div>
			</div>
		);
	}
}

export default ProfileEditPage;
