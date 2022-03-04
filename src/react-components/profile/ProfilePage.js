import React from "react";
import ReactDOM from "react-dom";
import Header from "../header/Header.js";
import Navbar from "../navbar/Navbar.js";
import "./ProfilePage.css";
import { withRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

class ProfilePage extends React.Component {
  state = {
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
        bio: "I am an admin. I have powers.",
        profilePicture:
          "https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg.jpg", //profile picture is a url-based image at the moment
        contactInfo: {
          phoneNumber: 649 - 273 - 7381,
          email: "admin@email.com",
        },
        isAdmin: true,
      };
    } else {
      this.state = {
        watchlist: "",
        bio: "This is a bio. This website is great.",
        profilePicture:
          "https://buildyourspechere.com/wp-content/uploads/2020/10/placeholder-image-person-jpg.jpg", //profile picture is a url-based image at the moment
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
            <h2 id="displayName">{this.props.displayName}</h2>
            <h2 id="userName">{this.props.username}</h2>
            <p id="bio">{this.state.bio}</p>
            <p id="phone-number">{this.state.phoneNumber}</p>
            <a id="change-password">Change Password</a>
          </div>

          <div id="watchlist-section">
            <h2>My Watchlist</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
