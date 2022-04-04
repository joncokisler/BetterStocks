import React from "react";
import { uid } from "react-uid";
import "./ProfilePage.css";
import { NavLink, withRouter } from "react-router-dom";

class ProfilePage extends React.Component {
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

	openPopup = (e) => {
		const x = e.target.parentNode.nextSibling;
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
	};

	closePopup = (e) => {
		const x = e.target.parentNode.parentNode;
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
	};

	handleSubmitChange = (e) => {
		const parent = e.target.parentNode;
		const newName = parent.children[3].value;
		const newEmail = parent.children[5].value;
		const newPhone = parent.children[7].value;

		if (newName != "") {
			this.setState({ ["displayName"]: newName });
		}
		if (newEmail != "") {
			this.setState({ ["email"]: newEmail });
		}
		if (newPhone != "") {
			this.setState({ ["phone"]: newPhone });
		}

		this.props.parentUpdate(
			this.state.userName,
			this.state.displayName,
			this.state.email,
			this.state.phone,
			this.state.coins
		);
		const x = e.target.parentNode.parentNode;
		if (x.style.display === "none") {
			x.style.display = "block";
		} else {
			x.style.display = "none";
		}
	};

	constructor(props) {
		super(props);

		try {
		} catch (e) {
			if (this.props.loggedInUser.watchlist.length > 0) {
				this.props.loggedInUser.watchlist.forEach((stock, index) => {
					// stockList.push(<NavLink className="watchlist-stock" to={`/stock?symbol=${stock}`}></NavLink>)
					this.state.stockList.push(
						<NavLink
							id={uid(stock)}
							className="watchlist-stock"
							to={`/stocks?symbol=${stock}`}
						></NavLink>
					);
				});
			}
		}

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
				<div id="profile-page">
					<div id="contact-info">
						<h2 className="grid-element" id="display-name">
							{this.state.loggedInUser.displayName}
						</h2>
						<img
							id="profile-picture"
							className="grid-element"
							src={this.state.loggedInUser.profilePicture}
							alt="Profile"
						/>
						<h2 className="grid-element" id="user-name">
							@{this.state.loggedInUser.userName}
						</h2>
						<p className="grid-element" id="bio">
							{this.state.loggedInUser.bio}
						</p>
						<p className="grid-element" id="phone-number">
							{this.state.loggedInUser.phoneNumber}
						</p>
						<NavLink className="grid-element" id="change-password" to="/login">
							Change Password
						</NavLink>
						<div id="watchlist-section">
							<h2>My Watchlist</h2>
							<ul id="profileWatchlist">{this.stockList}</ul>
						</div>
					</div>
					{console.log("open")}
				</div>
			</div>
		);
	}
}

export default ProfilePage;
