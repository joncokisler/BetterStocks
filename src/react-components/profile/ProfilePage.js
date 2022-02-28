import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../header/Header.js';
import './ProfilePage.css';
import { withRouter } from "react-router-dom";
import { Navigate } from 'react-router-dom';

class ProfilePage extends React.Component {

    state ={
        username:"",
        displayName:"",
        watchlists:"",
        bio:"",
        profilePicture:"", //profile picture is a url-based image at the moment
        contactInfo: {
            phoneNumber:null,
            email:"",
        }
    }

    render() {
        return (
            <div>
                <Header/>

            </div>
        )
    }
}

export default ProfilePage