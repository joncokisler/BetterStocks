import React from 'react';
import './App.css';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import LoginPage from './react-components/login-signup/LoginPage';
import SignupPage from './react-components/login-signup/SignupPage';
// import TopStocks from './react-components/TopStocks';
// import TrendingStocks from './react-components/TrendingStocks';
import Profile from './react-components/profile/ProfilePage.js'

class App extends React.Component {

  users = {
    admin: {
      userName: "admin",
      displayName: "John(Admin)",
      profilePicture: "",
      bio: "I am an admin. I have powers",
      email: "admin@email.com",
      phoneNumber: 6492737381,
      isAdmin: true
    },
    user: {
      userName: "user",
      displayName: "Fred(User)",
      profilePicture: "",
      bio: "This is a bio. This website is great.",
      email: "user@email.com",
      phoneNumber: 6482453443,
      isAdmin: false,
      watchlist:[]

    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <LoginPage /> } />
            <Route path='/signup' element={ <SignupPage /> } />
            {/* <Route path='/top-stocks' element={ <TopStocks /> } /> */}
            {/* <Route path='/trending-stocks' element={ <TrendingStocks /> } /> */}
            <Route path='/profile' element={ <Profile loggedInUser = {this.users.user} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
