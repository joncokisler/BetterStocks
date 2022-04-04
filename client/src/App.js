import React from "react";
import "./App.css";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";

import Navbar from "./react-components/navbar/Navbar";
import LoginPage from "./react-components/login-signup/LoginPage";
import SignupPage from "./react-components/login-signup/SignupPage";
import PaperTrade from "./react-components/PaperTrade";
import TopStocks from "./react-components/TopStocks";
import ProfilePage from "./react-components/profile/ProfilePage";
import TrendingStocks from "./react-components/TrendingStocks";
import Stock from "./react-components/stock-trend/index";
import ReviewPage from "./react-components/ReviewComponents/ReviewPage";
import SearchPage from "./react-components/search-page";
import AdminPage from "./react-components/AdminComponents/AdminPage";
import StockListing from "./react-components/StockListing";
import GamePage from "./react-components/TypeGame/TypeGame";

import ENV from './config.js';
const API_HOST = ENV.api_host;

class App extends React.Component {
	state = {
		loggedInUser: "",
		loginRedirect: false,
		profileRedirect: false,

		users: {
			admin: {
				userName: "admin",
				displayName: "John(Admin)",
				profilePicture:
					"https://image.shutterstock.com/mosaic_250/2797510/1617540484/stock-photo-closeup-photo-of-amazing-short-hairdo-lady-looking-up-empty-space-deep-thinking-creative-person-arm-1617540484.jpg",
				bio: "I am an admin. I have powers",
				email: "admin@email.com",
				phoneNumber: 6492737381,
				isAdmin: true,
				watchlist: [],
			},
			user: {
				userName: "user",
				displayName: "Fred(User)",

				profilePicture:
					"https://st.depositphotos.com/2309453/3449/i/600/depositphotos_34490345-stock-photo-confident-casual-unshaven-young-man.jpg",

				bio: "This is a bio. This website is great.",
				email: "user@email.com",
				phoneNumber: 6482453443,
				isAdmin: false,

				watchlist: [],
			},
		},
	};

	handleLoginCallback = (childData) => {
		// console.log(childData)
		// console.log(`USERNAME IS ${childData.username} `)
		// console.log(`PASSWORD IS ${childData.password} `)

		if (childData.username === "admin" && childData.password === "admin") {
			this.setState({ loggedInUser: this.state.users.admin });
			// console.log("ISOKAY")
			this.setState({ profileRedirect: true });
		} else if (childData.username === "user" && childData.password === "user") {
			this.setState({ loggedInUser: this.state.users.user });
			this.setState({ profileRedirect: true });
		} else {
			// console.log("WRONG USER INFO ENTERED")
			this.handleLoginRedirect();
		}

		// console.log(this.state.loggedInUser.userName)
	};

	handleLoginCallbackServer = (userJSON) => {
		console.log(userJSON);
		fetch(`${API_HOST}/users/login`, {
			method: "POST",
			headers: {
				Accept: "application/json text/plain, */*",
				"Content-Type": "application/json",
			},
			body: userJSON,
		}).then((response) => {
			console.log(response);
			if (!response.ok) this.handleLoginRedirect();
			else this.setState({ loggedInUser: response.json() });
			console.log(this.state.loggedInUser);
		});
	};

	submitInfo = (signupJSON) => {
		console.log("submitting sugnup info");

		fetch(`${API_HOST}/api/users`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: signupJSON,
		}).then((response) => {
			console.log(response);
			if (!response.ok) throw new Error(response.status);
			else this.setState({ loggedInUser: response.json() });
		});

		console.log("HELLOOO", this.state.loggedInUser);
	};

	handleLoginRedirect = () => {
		this.setState({ loginRedirect: true });
	};

	constructor(props) {
		super(props);
		this.handleLoginCallback = this.handleLoginCallback.bind(this);
		this.handleLoginCallbackServer = this.handleLoginCallbackServer.bind(this);
		this.submitInfo = this.submitInfo.bind(this);
	}
	render() {
		// console.log(this.state.loggedInUser)

		if (this.state.loginRedirect) {
			this.setState({ loginRedirect: false });
		}

		return (
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<LoginPage
									profileRedirect={this.state.profileRedirect}
									handleLoginCallback={this.handleLoginCallbackServer}
								/>
							}
						/>

						<Route
							path="signup"
							element={<SignupPage submitInfo={this.submitInfo} />}
						/>

						<Route
							path="paper-trade"
							element={
								<React.Fragment>
									<Navbar user={this.state.loggedInUser} />
									<PaperTrade loggedInUser={this.state.loggedInUser} />
								</React.Fragment>
							}
						/>
						
						<Route
							path="stocklisting"
							element={
								<React.Fragment>
									<Navbar user={this.state.loggedInUser} />
									<StockListing
										loggedInUser={this.state.loggedInUser}
										columns={[
											{
												name: "history",
												label: "24-Hr Price History",
												type: "trace",
												sortable: false,
											},
											{
												name: "price",
												label: "Last Known Price",
												type: "price",
												sortable: true,
											},
											{
												name: "week_stars",
												label: "7-Day Avg. Review Rating",
												type: "stars",
												sortable: true,
											},
										]}
									/>
								</React.Fragment>
							}
						/>

						<Route
							path="stocks/reviews"
							element={
								<React.Fragment>
									<Navbar user={this.state.loggedInUser} />
									<ReviewPage loggedInUser={this.state.loggedInUser} />
								</React.Fragment>
							}
						/>

						<Route
							path="admin"
							element={
								<React.Fragment>
									<Navbar user={this.state.loggedInUser} />
									<AdminPage loggedInUser={this.state.loggedInUser} />
								</React.Fragment>
							}
						/>

						<Route
							path="profile"
							element={
								<React.Fragment>
									<Navbar user={this.state.loggedInUser} />
									<ProfilePage loggedInUser={this.state.loggedInUser} />
								</React.Fragment>
							}
						/>

						<Route
							path="game"
							element={
								<React.Fragment>
									<Navbar user={this.state.loggedInUser} />
									<GamePage loggedInUser={this.state.loggedInUser} />
								</React.Fragment>
							}
						/>
					</Routes>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
