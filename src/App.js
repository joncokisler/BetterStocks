
import React from 'react';
import './App.css';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

import LoginPage from './react-components/login-signup/LoginPage';
import SignupPage from './react-components/login-signup/SignupPage';
import PaperTrade from './react-components/PaperTrade';
import TopStocks from './react-components/TopStocks';
import ProfilePage from './react-components/profile/ProfilePage';
import TrendingStocks from './react-components/TrendingStocks';
import Stock from './react-components/stock-trend/index';
import ReviewPage from './react-components/ReviewComponents/ReviewPage';


class App extends React.Component {

  state = {

    loggedInUser: "",
    loginRedirect: false,
    profileRedirect: false,

    users: {
      admin: {
        userName: "admin",
        displayName: "John(Admin)",
        profilePicture: "https://image.shutterstock.com/mosaic_250/2797510/1617540484/stock-photo-closeup-photo-of-amazing-short-hairdo-lady-looking-up-empty-space-deep-thinking-creative-person-arm-1617540484.jpg",
        bio: "I am an admin. I have powers",
        email: "admin@email.com",
        phoneNumber: 6492737381,
        isAdmin: true,
        watchlist:[]

      },
      user: {
        userName: "user",
        displayName: "Fred(User)",

        profilePicture: "https://st.depositphotos.com/2309453/3449/i/600/depositphotos_34490345-stock-photo-confident-casual-unshaven-young-man.jpg",

        bio: "This is a bio. This website is great.",
        email: "user@email.com",
        phoneNumber: 6482453443,
        isAdmin: false,

        watchlist: []


      }
    }
  }

  handleLoginCallback = (childData) => {
    console.log(childData)
    console.log(`USERNAME IS ${childData.username} `)
    console.log(`PASSWORD IS ${childData.password} `)
    
    if (childData.username === "admin" && childData.password === "admin") {
      this.setState({ loggedInUser: this.state.users.admin })
      console.log("ISOKAY")
      this.setState({ profileRedirect: true })
    }
    
    else if (childData.username === "user" && childData.password === "user") {
      this.setState({ loggedInUser: this.state.users.user })
      this.setState({ profileRedirect: true })
    }
    
    else {
      console.log("WRONG USER INFO ENTERED")
      this.handleLoginRedirect()
    }

    console.log(this.state.loggedInUser.userName)
  }

  handleLoginRedirect = () => {
    this.setState({ loginRedirect: true })
  }

  constructor(props) {
    super(props)
    this.handleLoginCallback = this.handleLoginCallback.bind(this)
  }
  render() {
    console.log(this.state.loggedInUser)

    if (this.state.loginRedirect) {
      this.setState({ loginRedirect: false })
    }

    return (
      <div className="App">
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<LoginPage profileRedirect={this.state.profileRedirect} handleLoginCallback={ this.handleLoginCallback }/>} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='top-stocks' element={<TopStocks loggedInUser = {this.state.loggedInUser} />} />
            <Route path='trending-stocks' element={<TrendingStocks loggedInUser = {this.state.loggedInUser}/>} />
            <Route path='paper-trade' element={<PaperTrade loggedInUser = {this.state.loggedInUser} />} />
            <Route path='stocks' element={<Stock loggedInUser = {this.state.loggedInUser} />} />
            <Route path='stocks/reviews' element={<ReviewPage loggedInUser = {this.state.loggedInUser} />} />
            <Route path='/profile' element={<ProfilePage loggedInUser={this.state.loggedInUser} />} />

          </Routes>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
