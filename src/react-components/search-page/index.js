import React from "react";
import SearchBar from './SearchBar'; 
import NavBar from '../navbar/Navbar';
import './styles.css';


class SearchPage extends React.Component {
    render () {
        return(
            <React.Fragment>
            <NavBar/>
            <div className='content'>
                <h3>Search For A Stock</h3>
                <SearchBar stocks/>
            </div>
        </React.Fragment>
  )}

}

export default SearchPage;