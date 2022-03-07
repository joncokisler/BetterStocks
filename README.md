
# Better Stocks

*Team 26*

aleemmuj - Mujahid Muhammad Aleem  
shenxuez - Xuezhou Shen  
liraym11 - Raymond Lin-Feng Li  
cokisler - Can Cokisler


## Installation

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

## Usage

### User:

Log in with a typical user `username: user` and `password: user`. Users are able to access the following pages.

+ **Profile:** Click on the profile button(top right) to view the User's profile page, which includes their profile picture, username (which is an unique identifier), display name, email and phone number. 
+ **Search:** Chick on the Search button to navigate to a seach bar. It will be implemented with a Yahoo API in phase 2. 
+ **Trending:** Click on the Trending button to view the top 5 stocks that are rated by users. Click on the stock "AAPL" to view the information of this stock. Note that other stocks does not link to a stock page.
+ **Top Stocks:**  Click on the Top Stocks button to view the top 5 stocks that have the highst return rate by this month. Click on the stock "AAPL" to view the information of this stock. Note that other stocks does not link to a stock page.
+ **Stock** In the Stock page, it shows the trending of the stock (for now there is only some mock data) and some critical summary data. Users can choose to view the trending in 1 day, 1 week, 1 month, 3 months, 6 months, 1 year. There is also a summary of user rating of this stock. Click on the Review History button to view the Reviews and detailed statistics of this stock.
+ **Review** In the Review page, click on the Write Comment button to write a new comment and click on the Submit button to submit the comment. A new comment should be added in the Review section. There is a detailed summary of the user ratings.

### Admin:

Log in with a typical admin user  `username: admin` and `password: admin`. Admins are able to access all pages that users can access. Admins can also access the Admin Page.

+ **Admin:** Admins can view the information of all users and users in the blacklist. By clicking on the Add to Blacklist button, Admins can one user to the blacklist. By clicking on the Remove button, Admins can remove one user from the blacklist. Admins can also edit the user information.