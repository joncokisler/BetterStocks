import React from "react";
import ReactDOM from "react-dom";
import Header from "../header/Header.js";
import Navbar from "../navbar/Navbar.js";
import "./ProfilePage.css";
import { NavLink, withRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

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

        stockList: []
    };



    constructor(props) {
        super(props);

        if (this.props.loggedInUser.watchlist.length > 0) {
            this.props.loggedInUser.watchlist.forEach((stock, index) => {

                // stockList.push(<NavLink className="watchlist-stock" to={`/stock?symbol=${stock}`}></NavLink>)
                this.state.stockList.push(<NavLink className="watchlist-stock" to={`/`}></NavLink>)
            })
        }




        this.state = {

            loggedInUser: {
                watchlist: this.props.loggedInUser.watchlist,
                displayName: this.props.loggedInUser.displayName,
                userName: this.props.loggedInUser.userName,
                bio: this.props.loggedInUser.bio,

                profilePicture:
                    this.props.loggedInUser.profilePicture, //profile picture is a url-based image at the moment

                phoneNumber: this.props.loggedInUser.phoneNumber,
                email: this.props.loggedInUser.email,
                isAdmin: this.props.loggedInUser.isAdmin,

            }

        };

    }
    //do api calls to assign values to states
    componentDidMount() {
        this.doApiCalls();
    }

    doApiCalls() {
        //uncomment when api is implemented
        //     $.getJSON('https://bluhbluh/api')
        //   .then(({ results }) => this.setState({ someState: someResult }));
    }
    //THE COMPONENTS WILL RELY ON API CALLS TO THE SERVER TO FILL
    // IN THE DATA
    render() {
        console.log(this.state.loggedInUser)
        return (
            <div>
                <Navbar />

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
                            {this.state.loggedInUser.userName}
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
                            <ul id="profileWatchlist">
                                {this.stockList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;
