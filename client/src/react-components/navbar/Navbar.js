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

                <div id="nav-section">
                    <ul>
                        <a className="logo">BetterStocks</a>
                        <li><NavLink className="nav-items" to="/stocklisting">Stocks</NavLink></li>
                        <li><NavLink className="nav-items" to="/paper-trade">Paper Trading</NavLink></li>
                        <li><NavLink className="nav-items" to="/game">TypeGame</NavLink></li>
                        { this.renderAdmin(user) }
                        <li><NavLink className="nav-items" to="/profile">Profile</NavLink></li>
                    </ul>


                </div>
            </div>
        )
    }
}
export default Navbar
