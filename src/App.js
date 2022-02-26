import './App.css';

import StockList from './react-components/StockList'

function App() {
  const state = {
    stocks: [
      {symbol: 'AAPL', trend: [1,2,3,4], val1: -100, val2: 5},
      {symbol: 'AMD', trend: [1,2,3,4], val1: 165, val2: 25},
      {symbol: 'INTC', trend: [1,2,3,4], val1: 148, val2: 20},
      {symbol: 'NVDA', trend: [1,2,3,4], val1: 207, val2: 20},
      {symbol: 'TSLA', trend: [1,2,3,4], val1: 207, val2: 30},
    ],
    stock_ratings: [
      {symbol: 'AAPL', trend: [4,4.5,4.5,5], val1: 4.5, val2: 24, val1_mode: 'stars'},
      {symbol: 'AMD', trend: [4,4.5,4.5,5], val1: 2.2, val2: 18, val1_mode: 'stars'},
      {symbol: 'INTC', trend: [4,4.5,4.5,5], val1: 1.6, val2: 50, val1_mode: 'stars'},
      {symbol: 'NVDA', trend: [4,4.5,4.5,5], val1: 3.8, val2: 97, val1_mode: 'stars'},
      {symbol: 'TSLA', trend: [4,4.5,4.5,5], val1: 2.9, val2: 9, val1_mode: 'stars'},
    ]
  }

  return (
    <div className="App">
      <StockList stocks={ state.stocks } trend_name='Price Trend' col1_name='This Year' col2_name='This Month'/>
      <StockList stocks={ state.stock_ratings } trend_name='Rating Trend' col1_name='Average Rating Today' col2_name='Reviews Today'/>
    </div>
  );
}

export default App;
