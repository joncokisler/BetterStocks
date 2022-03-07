
import React from 'react';
import './App.css';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

import LoginPage from './react-components/login-signup/LoginPage';
import SignupPage from './react-components/login-signup/SignupPage';
import PaperTrade from './react-components/PaperTrade';
import TopStocks from './react-components/TopStocks';
import TrendingStocks from './react-components/TrendingStocks';
import Stock from './react-components/stock-trend/index';

class App extends React.Component {

  state = {
    loggedInUser:"",
    loginRedirect: false,

    users: {
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
  }

  

  handleLoginCallback = (childData) => {
    if(childData.userName === "admin" && childData.password ==="admin"){
      this.setState({loggedInUser: this.state.users.admin})
    }
    else if(childData.userName === "user" && childData.password ==="user"){
      this.setState({loggedInUser: this.state.users.user})
    }
    else{
      console.log("WRONG USER INFO ENTERED")
      this.handleLoginRedirect()
    }
  }

  handleLoginRedirect = () =>{
    this.setState({loginRedirect:true})
  }


  render() {
    if(this.setState.loginRedirect){
      this.setState({loginRedirect:false})
      return <Navigate to={"/login"} />
    }
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage handleLoginCallback={ this.handleLoginCallback }/>} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='top-stocks' element={<TopStocks loggedInUser = {this.state.loggedInUser} />} />
            <Route path='trending-stocks' element={<TrendingStocks loggedInUser = {this.state.loggedInUser}/>} />
            <Route path='paper-trade' element={<PaperTrade loggedInUser = {this.state.loggedInUser} />} />
            <Route path='stock' element={<Stock loggedInUser = {this.state.loggedInUser} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
