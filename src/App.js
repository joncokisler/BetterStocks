import './App.css';

import StockList from './react-components/StockList';

function App() {
  const state = {
    stocks: [
      {symbol: 'AAPL', trend: [73, 23, 38, 45], val1: -100, val2: 5},
      {symbol: 'AMD', trend: [85, 92, 66, 12], val1: 165, val2: 25},
      {symbol: 'INTC', trend: [54, 57, 29, 36], val1: 148, val2: 20},
      {symbol: 'NVDA', trend: [11, 33, 47, 37], val1: 207, val2: 20},
      {symbol: 'TSLA', trend: [73, 78, 82, 22], val1: 207, val2: 30},
    ],
    stock_ratings: [
      {symbol: 'AAPL', trend: [2.71, 1.79, 3.90, 4.96], val1: 4.5, val2: 24, val1_mode: 'stars'},
      {symbol: 'AMD', trend: [0.82, 1.18, 0.57, 3.81], val1: 2.2, val2: 18, val1_mode: 'stars'},
      {symbol: 'INTC', trend: [3.24, 0.82, 0.37, 0.96], val1: 1.6, val2: 50, val1_mode: 'stars'},
      {symbol: 'NVDA', trend: [4.70, 2.76, 2.16, 4.80], val1: 3.8, val2: 97, val1_mode: 'stars'},
      {symbol: 'TSLA', trend: [3.94, 0.21, 2.69, 2.74], val1: 2.9, val2: 9, val1_mode: 'stars'},
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
