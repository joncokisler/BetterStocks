import './App.css';

import StockList from './react-components/StockList'

function App() {
  const state = {
    stocks: [
      {symbol: 'TSLA', ticks: [1,2,3,4], val1: 207, val2: 30},
      {symbol: 'AMD', ticks: [1,2,3,4], val1: 165, val2: 25},
      {symbol: 'INTC', ticks: [1,2,3,4], val1: 148, val2: 20},
      {symbol: 'NVDA', ticks: [1,2,3,4], val1: 108, val2: 20},
      {symbol: 'AAPL', ticks: [1,2,3,4], val1: -100, val2: 5},
    ]
  }

  return (
    <div className="App">
      <StockList stocks={ state.stocks }/>
    </div>
  );
}

export default App;
