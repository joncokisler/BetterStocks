import React from 'react';
import './App.css';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import LoginPage from './react-components/login-signup/LoginPage';
import SignupPage from './react-components/login-signup/SignupPage';
// import TopStocks from './react-components/TopStocks';
// import TrendingStocks from './react-components/TrendingStocks';
import Profile from './react-components/profile/ProfilePage.js'

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <LoginPage /> } />
            <Route path='/signup' element={ <SignupPage /> } />
            {/* <Route path='/top-stocks' element={ <TopStocks /> } /> */}
            {/* <Route path='/trending-stocks' element={ <TrendingStocks /> } /> */}
            <Route path='/profile' element={ <Profile />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
