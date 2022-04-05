
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

+ **Profile:** Click on the profile button in the navbar to view the user's profile page, which includes their profile picture, username (which is an unique identifier), display name, email and phone number. All users are assigned with a 
default profile picture.
+ **Stocks:**  Click on the Stocks button to view a list of stocks. Users can see the symbol 24Hr price history graph, last know price and the 7 day average review rating. Users can sort by stock symbol in this table. Users from this page can also search for a stock via the search bar by typing the symbol of a stock. When clicking on a stock, that will navigate the user to the page of the stock, where they can view additional information about it.
+ **Stocks (single stock)** In the Stock page, it shows the stock's critical summary data. Users can choose to view the trend for time periods such as 1 day, 1 week, 1 month, 3 months, 6 months, 1 year. There are also user comments and ratings below the stock summary. Users can also write a comment. However, if a user is in the blacklist, the comment feature will be blocked from him.
+ **Paper Trading**: In the Paper Trading page, a simulation of the stock market can be run. Each user initially has 1000 better coins/capital. Users can earn more capitals by buy and sell stocks/assets. To the left of the screen, it has information about the user's portfolio. Users can type in a stock symbol to search for a stock. The list of holdings appears beneath the portfolio summary and the buy/sell buttons. A limitation is that the API has a limit of calls for the free tier - so we had to limit the pool of stocks available to trade on our platform.
+ **TypeGame** In the type game page, users can play a simple typeracer game to increase the value of their wallets. Typing the following stock related words conrrectly will net additional points for the users, which is converted into Better Coins™. To start the game, users can type anything in the input box and the timer will start counting. To submit a word, type 'Enter'. Each game has 30 seconds of time limit. On the left side of the screen, users are able to see a count down timer, the current score and the personal best of this account. On the right side of the screen,
there is a detailed instruction of the game as well.
+ **GameOver**
When the timer counts to 0, the game is over and a game over page will be displayed. On the top it displays a 
congratulation message with the scores and user's personbal best score. Below that is a leaderboard that shows at most 5 top users who have the highest scores. If there are less than 5 gameplay records in our database, it may show less than 5 top users. Users can hit the play again button to play the game again.

### Admin:

Log in with the default username and password of `admin` and `admin`. Admins are able to access all pages that users can access. Admins can also access the Admin Page.

+ **Admin:** Admin accounts have an extra link on the navigation bar. Admins can view the information of all users and users in the blacklist. By clicking on the Add to Blacklist button, Admins can one user to the blacklist. By clicking on the Remove button, Admins can remove one user from the blacklist. Users in the blacklist cannot access the write comment feature. This feature is designed to punish users who do not comment properly. When they are removed from the blacklist, they will be able to write comments. Admins can also edit the user information - such as the displayname, email, phone number, and the amount of better coins/capitals they have in their portfolio. When admins click on the Edit button, there will ba a pop-up box that allow them to enter the new displayname, email, phone number, and the amount of better coins/capitals respectively. They can choose to change all four attributes at once, or they can only change some of them. Empty inputs will not be recorded.


## Routes:

 ### admin.js


 + POST /api/admin/users  
Create a new ADMIN user.  
Parameters:  
Body: User information. {username: <username>, displayName: <display name>, password: <password>, secret: "verylongsupersecretandsecurestring"}  
 Returns: 200 on success, and the database representation of the user.

 + PATCH /api/admin/users
 * 
 * Update a regular user's information.
 * 
 * Parameters: username (username of the user to change)
 * 
 * Body: Array of operations to complete: {"op", "replace", "path", "/<attribute to replace>", "value": <new value>}
 * 
 *     The only attributes that can be modified are: "displayName", "email", "phone", "betterCoins", 'bio'
 * 
 * Response: 200 on success and the new user's representation.
