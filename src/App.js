import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import LoginPage from './react-components/login-signup/LoginPage';
import SignupPage from './react-components/login-signup/SignupPage';
import PaperTrade from './react-components/PaperTrade';
import TopStocks from './react-components/TopStocks';
import TrendingStocks from './react-components/TrendingStocks';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <LoginPage /> } />
            <Route path='signup' element={ <SignupPage /> } />
            <Route path='top-stocks' element={ <TopStocks /> } />
            <Route path='trending-stocks' element={ <TrendingStocks /> } />
            <Route path='paper-trade' element={ <PaperTrade /> } />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
