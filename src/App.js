import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import LoginPage from './react-components/login-signup/LoginPage';
import SignupPage from './react-components/login-signup/SignupPage';
import PaperTrade from './react-components/PaperTrade';
import TopStocks from './react-components/TopStocks';
import ProfilePage from './react-components/profile/ProfilePage';
import TrendingStocks from './react-components/TrendingStocks';
import Stock from './react-components/stock-trend/index';
import ReviewPage from './react-components/ReviewComponents/ReviewPage';
// import SearchPage from './react-components/search-page';
import AdminPage from './react-components/AdminComponents/AdminPage'


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>

            <Route path='/' element={<LoginPage profileRedirect={this.state.profileRedirect} handleLoginCallback={ this.handleLoginCallback }/>} />

            <Route path='signup' element={<SignupPage />} />

            <Route path='top-stocks' element={
              <React.Fragment>
                <Navbar user={ this.state.loggedInUser }/>
                <TopStocks loggedInUser = {this.state.loggedInUser} />
              </React.Fragment>
            } />

            <Route path='trending-stocks' element={
              <React.Fragment>
                <Navbar user={ this.state.loggedInUser }/>
                <TrendingStocks loggedInUser = {this.state.loggedInUser} />
              </React.Fragment>
            } />

            <Route path='paper-trade' element={
              <React.Fragment>
                <Navbar user={ this.state.loggedInUser }/>
                <PaperTrade loggedInUser = {this.state.loggedInUser} />
              </React.Fragment>
            } />

            {/* <Route path='search' element={
              <React.Fragment>
                <Navbar user={ this.state.loggedInUser }/>
                <SearchPage loggedInUser = {this.state.loggedInUser} />
              </React.Fragment>
            } /> */}

            <Route path='stocks' element={
              <React.Fragment>
                <Navbar user={ this.state.loggedInUser }/>
                <Stock loggedInUser = {this.state.loggedInUser} />
              </React.Fragment>
            } />

            <Route path='stocks/reviews' element={
              <React.Fragment>
                <Navbar user={ this.state.loggedInUser }/>
                <ReviewPage loggedInUser = {this.state.loggedInUser} />
              </React.Fragment>
            } />

            <Route path='admin' element={
              <React.Fragment>
                <Navbar user={ this.state.loggedInUser }/>
                <AdminPage loggedInUser = {this.state.loggedInUser} />
              </React.Fragment>
            } />
          
            <Route path='profile' element={
              <React.Fragment>
                <Navbar user={ this.state.loggedInUser }/>
                <ProfilePage loggedInUser = {this.state.loggedInUser} />
              </React.Fragment>
            } />

          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
