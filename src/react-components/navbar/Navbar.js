import React from 'react';
import ReactDOM from 'react-dom';
import './Navbar.css'
import { Navigate } from 'react-router-dom';

class Navbar extends React.Component {

    state = {
        profileRedirect:null,
        topstocksRedirect:null,
        searchRedirect:null,
        trendingRedirect:null
    };

    handlepProfile = () => {
        this.setState({profileRedirect:"/profilePage"})
    }

    handleTopStocks = () => {
        this.setState({topstocksRedirect:"/topstocksPage"})
    }

    handleSearch = () => {
        this.setState({searchRedirect:"/searchPage"})
    }
    handleTrending = () => {
        this.setState({trendingRedirect:"/trendingPage"})
    }
    render() {

        if(this.state.profileRedirect){
            return <Navigate to={this.state.profileRedirect}></Navigate>
        }if(this.state.topstocksRedirect){
            return <Navigate to={this.state.topstocksRedirect}></Navigate>
        }if(this.state.searchRedirect){
            return <Navigate to={this.state.searchRedirect}></Navigate>
        }if(this.state.trendingRedirect){
            return <Navigate to={this.state.trendingRedirect}></Navigate>
        }

        return (
            <div class="navbar sticky">
                <div id='logo'>
                    <a>BetterStocks</a>
                </div>

                <div id="nav-section">
                    <ul>
                        <li><a class="nav-items" onClick={ this.handleTopStocks }>Top Stocks</a></li>
                        <li><a class="nav-items" onClick={ this.handleTrending}>Trending</a></li>
                        <li><a class="nav-items" onClick={ this.handleSearch}>Search</a></li>
                    </ul>

                    <div id="profile-section">
                        <h3>Profile</h3>
                    </div>
                </div>
            </div>
        )
    }
}
export default Navbar