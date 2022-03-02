import React from 'react';
import './App.css';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

import LoginPage from './react-components/login-signup/LoginPage';
import SignupPage from './react-components/login-signup/SignupPage';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <LoginPage /> } />
            <Route path='signup' element={ <SignupPage /> } />
            <Route path='top-stocks' element={ <div>top-stocks</div> } />
            <Route path='trending-stocks' element={ <div>trending-stocks</div> } />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
