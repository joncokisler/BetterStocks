import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import LoginPage from './react-components/login-signup/LoginPage';
import SignupPage from './react-components/login-signup/SignupPage';
// import Profile from './react-components/profile/ProfilePage.js';
// import Navbar from './react-components/navbar/Navbar.js';


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={ <LoginPage/> } />
            <Route path='/signup' element={ <SignupPage /> } />
            <Route path='/top-stocks' element={ <div>top-stocks</div> } />
            <Route path='/trending-stocks' element={ <div>trending-stocks</div> } />
            <Route path='paper-trade' element={ <PaperTrade />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
