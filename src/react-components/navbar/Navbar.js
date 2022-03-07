import React from 'react';
import ReactDOM from 'react-dom';
import './Navbar.css'
import { Navigate, NavLink } from 'react-router-dom';


class Navbar extends React.Component {

    state = {
        profileRedirect:null,
        topstocksRedirect:null,
        searchRedirect:null,
        trendingRedirect:null
    };

    render() {

        return (
            <div className="navbar sticky">
                <div id='logo'>
                    <a>BetterStocks</a>
                </div>

                <div id="nav-section">
                    <ul>
                        <li><NavLink className="nav-items" to="/top-stocks">Top Stocks</NavLink></li>
                        <li><NavLink className="nav-items" to="/trending-stocks">Trending</NavLink></li>
                        <li><NavLink className="nav-items" to="/search-page">Search</NavLink></li>
                        {/* {this.props.loggedInUser.isAdmin &&
                         <li><NavLink className="nav-items" to="/admin">Admin Page </NavLink></li>
                         } */}
                    </ul>

                    <div id="profile-section">
                        <h3><NavLink to="/profile">Profile </NavLink></h3>
                    </div>
                </div>
            </div>
        )
    }
}
export default Navbar
