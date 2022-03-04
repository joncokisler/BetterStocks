import React from "react";
import ReactDOM from "react-dom";
import Header from "../header/Header.js";
import Navbar from "../navbar/Navbar.js";
import "./ProfilePage.css";
import { withRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

class ProfilePage extends React.Component {
  state = {
    //no need for these states, will be props when backend implemented
    displayName: "",
    userName: "",
    //
    watchlist: "",
    bio: "",
    profilePicture: "", //profile picture is a url-based image at the moment
    contactInfo: {
      phoneNumber: "",
      email: "",
    },
    isAdmin: false,
  };

  constructor(props) {
    super(props);
    if (props.isAdmin === "admin") {
      this.state = {
        watchlist: "",
        //no need for these states, will be props when backend implemented
        displayName: "John Doe",
        userName: "johndoe",
        //
        bio: "I am an admin. I have powers.",
        profilePicture:
          "https://image.shutterstock.com/mosaic_250/2797510/1617540484/stock-photo-closeup-photo-of-amazing-short-hairdo-lady-looking-up-empty-space-deep-thinking-creative-person-arm-1617540484.jpg", //profile picture is a url-based image at the moment
        contactInfo: {
          phoneNumber: 649 - 273 - 7381,
          email: "admin@email.com",
        },
        isAdmin: true,
      };
    } else {
      this.state = {
        watchlist: "",
        //no need for these states, will be props when backend implemented
        displayName: "John Admin",
        userName: "adminjoe",
        //
        bio: "This is a bio. This website is great.",
        profilePicture:
          "https://st.depositphotos.com/2309453/3449/i/600/depositphotos_34490345-stock-photo-confident-casual-unshaven-young-man.jpg",
        contactInfo: {
          phoneNumber: 646 - 548 - 2904,
          email: "johndoe@email.com",
        },
        isAdmin: false,
      };
    }
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
    return (
      <div>
        <Navbar />

        <div id="profile-page">
          <div id="contact-info">
            <h2 className="grid-element" id="display-name">
              {this.state.displayName}
            </h2>
            <img
              id="profile-picture"
              className="grid-element"
              src={this.state.profilePicture}
              alt="Profile"
            />
            <h2 className="grid-element" id="user-name">
              {this.state.username}
            </h2>
            <p className="grid-element" id="bio">
              {this.state.bio}
            </p>
            <p className="grid-element" id="phone-number">
              {this.state.phoneNumber}
            </p>
            <a className="grid-element" id="change-password">
              Change Password
            </a>
            <div id="watchlist-section">
              <h2>My Watchlist</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
