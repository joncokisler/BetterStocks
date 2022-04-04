
## BetterStocks™

*Team 26*

aleemmuj - Mujahid Muhammad Aleem  
shenxuez - Xuezhou Shen  
liraym11 - Raymond Lin-Feng Li  
cokisler - Can Cokisler

## Description

Welcome to BetterStocks™: A social paper trading platform that tracks real time stocks, crypto, and other assets (built with React Native, Node.js & Mongo DB)! The website utilizes the Yahoo Finance API to get its information about stocks. On the website, users can buy and sell assets with our own Better Coins™. Users can rate stocks out of 5 stars and write reviews too. If users find themselves with low capital, they can play our stock typeracer game to add more Better Coins™ to their wallet. In this game module, top user high scores will be featured on a leaderboard. With our app, we hope to provide a unique platform that empowers users to make the right trades. 


## Installation

*In the ./client folder*

1.  Install NPM packages
   
    ```
    npm install
    ```

1.  Start the React development server 

    ```
    npm start
    ```

### External Dependencies

*   React
*   React Router
*   Chart.js / react-chart-js-2
*   React Icons
*   Material UI
*   Express

## Usage

### User:

Log in with the default username and password of `user` and `user`. Otherwise, you can create your own account!

+ **Profile:** Click on the profile button in the navbar to view the user's profile page, which includes their profile picture, username (which is an unique identifier), display name, email and phone number. 
+ **Stocks:**  Click on the Top Stocks button to view a list of stocks. Users can see the symbol 24Hr price history graph, last know price and the 7 day average review rating. Users can sort by stock symbol in this table. Users from this page can also search for a stock via the search bar. When clicking on a stock, that will navigate the user to the page of the stock, where they can view additional information about it.
+ **Stocks (single stock)** In the Stock page, it shows the stock's critical summary data. Users can choose to view the trend for time periods such as 1 day, 1 week, 1 month, 3 months, 6 months, 1 year. There is also a summary of user rating of this stock. Click on the Review History button to view the Reviews of the stock.
+ **Paper Trading**: In the Paper Trading page, a simulation of the stock market can be run. Users can buy and sell stocks/assets. To the left of the screen, it has information about the user's portfolio. Users can type in a stock symbol to search for a stock. The list of holdings appears beneath the portfolio summary and the buy/sell buttons. A limitation is that the API has a limit of calls for the free tier - so we had to limit the pool of stocks available to trade on our platform.
+ **TypeGame** In the type game page, users can play this to increase the value of their wallets. Typing the following words conrrectly will net additional points for the users, which is converted into Better Coins™. When the game is over, a leaderboard is shown of the top users who have the highest scores.

### Admin:

Log in with the default username and password of `admin` and `admin`. Admins are able to access all pages that users can access. Admins can also access the Admin Page.

+ **Admin:** Admins can view the information of all users and users in the blacklist. By clicking on the Add to Blacklist button, Admins can one user to the blacklist. By clicking on the Remove button, Admins can remove one user from the blacklist. Admins can also edit the user information - such as the amount of capital they have in their portfolio.
