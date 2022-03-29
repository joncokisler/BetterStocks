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

    renderAdmin(user) {
        try {
            if (user.isAdmin) {
                return <li><NavLink className="nav-items" to="/admin">Admin</NavLink></li>;
            }
        } catch (e) {
        }

        return;
    }

    render() {

        const { user } = this.props;

        return (
            <div className="navbar sticky">
                <div id='logo'>
                    <a>BetterStocks</a>
                </div>

                <div id="nav-section">
                    <ul>
                        <li><NavLink className="nav-items" to="/top-stocks">Top Stocks</NavLink></li>
                        <li><NavLink className="nav-items" to="/trending-stocks">Trending</NavLink></li>
                        <li><NavLink className="nav-items" to="/paper-trade">Paper Trading</NavLink></li>
                        <li><NavLink className="nav-items" to="/search">Search</NavLink></li>
                        { this.renderAdmin(user) }
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
