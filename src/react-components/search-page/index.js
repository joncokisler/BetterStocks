import React from "react";
import SearchBar from './SearchBar'; 
import './styles.css';


class SearchPage extends React.Component {
    render () {
        return (
            <div className='searchPage'>
                <div className='content'>
                    <h3>Search For A Stock</h3>
                    <SearchBar stocks/>
                </div>
            </div>
        );
    }

}

export default SearchPage;
