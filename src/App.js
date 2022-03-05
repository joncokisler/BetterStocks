import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';

import Stock from './react-components/stock-trend'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='stocks' element={ <Stock /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
