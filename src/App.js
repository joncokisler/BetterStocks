import './App.css';
import SearchBar from './react-components/SearchPage/';
import stonks from './/react-components/SearchPage/data.json';



function App() {
  return (
    <SearchBar placeholder="Enter the name of stock" data={stonks}/>
  );
}

export default App;
