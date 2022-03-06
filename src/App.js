import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import LoginPage from './react-components/login-signup/LoginPage';
import SignupPage from './react-components/login-signup/SignupPage';
import PaperTrade from './react-components/PaperTrade';
import TopStocks from './react-components/TopStocks';
import TrendingStocks from './react-components/TrendingStocks';

class App extends React.Component {

  users = {
    admin: {
      "userName": "admin",
      "displayName": "John(Admin)",
      "profilePicture": "",
      "bio": "I am an admin. I have powers",
      "email": "admin@email.com",
      "phoneNumber": 6492737381,
      "isAdmin": true
    },
    user: {
      "userName": "user",
      "displayName": "Fred(User)",
      "profilePicture": "",
      "bio": "This is a bio. This website is great.",
      "email": "user@email.com",
      "phoneNumber": 6482453443,
      "isAdmin": false

    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage />} />
            <Route path='top-stocks' element={<TopStocks />} />
            <Route path='trending-stocks' element={<TrendingStocks />} />
            <Route path='paper-trade' element={<PaperTrade />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
